import { Octokit } from "@octokit/rest";
import { Client as Notion } from "@notionhq/client";

// ---- Config via env ----
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_REPO_DB_ID = process.env.NOTION_DB_ID;
const GITHUB_ORG = process.env.GITHUB_ORG;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ARCHIVE_MISSING = (process.env.NOTION_ARCHIVE_MISSING || "true").toLowerCase() === "true";

// ---- Guards ----
if (!NOTION_TOKEN || !NOTION_REPO_DB_ID || !GITHUB_ORG || !GITHUB_TOKEN) {
  console.error("Missing env: NOTION_TOKEN, NOTION_DB_ID, GITHUB_ORG, GITHUB_TOKEN are required.");
  process.exit(1);
}

// ---- Clients ----
const gh = new Octokit({ auth: GITHUB_TOKEN });
const notion = new Notion({ auth: NOTION_TOKEN });

// ---- Helpers: GitHub ----
async function fetchAllOrgRepos(org) {
  // Covers all visibilities, archived, forks, etc. Adjust type if needed.
  return await gh.paginate(gh.repos.listForOrg, {
    org,
    type: "all",
    per_page: 100,
    sort: "full_name",
    direction: "asc",
  });
}

// ---- Helpers: Notion ----
async function fetchAllNotionPages(databaseId) {
  let results = [];
  let cursor = undefined;
  do {
    const resp = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
    });
    results = results.concat(resp.results);
    cursor = resp.has_more ? resp.next_cursor : undefined;
  } while (cursor);
  return results;
}

function getProp(page, name) {
  return page.properties?.[name];
}

function getPropNumber(page, name) {
  const p = getProp(page, name);
  return p?.type === "number" ? p.number : null;
}

function getPropTitle(page, name) {
  const p = getProp(page, name);
  if (p?.type === "title" && p.title.length) return p.title.map(t => t.plain_text).join("");
  return "";
}

async function dedupeNotionByRepoId(pages) {
  const keepById = new Map();
  const duplicates = [];
  for (const p of pages) {
    const rid = getPropNumber(p, "Repo ID");
    if (typeof rid === "number") {
      if (keepById.has(rid)) {
        duplicates.push(p);
      } else {
        keepById.set(rid, p);
      }
    }
  }
  return { keepById, duplicates };
}

function toNotionRichText(text) {
  if (!text) return [];
  return [{ type: "text", text: { content: text.slice(0, 1999) } }];
}

function toNotionDate(iso) {
  return iso ? { start: new Date(iso).toISOString() } : null;
}

function repoToNotionProps(r) {
  return {
    "Name": { title: [{ type: "text", text: { content: r.name } }] },
    "Repo ID": { number: r.id },
    "URL": { url: r.html_url },
  };
}

function pagePropsEqual(a, b) {
  // Shallow compare serialized props to avoid noisy updates
  return JSON.stringify(a) === JSON.stringify(b);
}

async function upsertRepo(notionDbId, repo, existingPageByRepoId) {
  const props = repoToNotionProps(repo);
  const existing = existingPageByRepoId.get(repo.id);

  if (!existing) {
    // Create
    await notion.pages.create({
      parent: { database_id: notionDbId },
      properties: props,
    });
    return { created: 1, updated: 0, skipped: 0 };
  } else {
    // Update iff changed
    const currentProps = {
      "Name": getProp(existing, "Name"),
      "Repo ID": getProp(existing, "Repo ID"),
      "URL": getProp(existing, "URL"),
    };

    if (!pagePropsEqual(props, currentProps)) {
      await notion.pages.update({
        page_id: existing.id,
        properties: props,
        archived: false, // unarchive if it was archived
      });
      return { created: 0, updated: 1, skipped: 0 };
    } else {
      return { created: 0, updated: 0, skipped: 1 };
    }
  }
}

async function main() {
  console.log("Fetching GitHub repos…");
  const repos = await fetchAllOrgRepos(GITHUB_ORG);

  // Build set of live repo IDs
  const liveIds = new Set(repos.map(r => r.id));

  console.log(`Repos fetched: ${repos.length}`);

  console.log("Fetching Notion pages…");
  const pages = await fetchAllNotionPages(NOTION_REPO_DB_ID);

  // Enforce uniqueness on "Repo ID": archive duplicates in Notion (keep the first found)
  let archived = 0;
  const { keepById, duplicates } = await dedupeNotionByRepoId(pages);
  if (duplicates.length) {
    await Promise.all(
      duplicates.map(p =>
        notion.pages.update({ page_id: p.id, archived: true }).then(() => { archived += 1; })
      )
    );
  }

  // Map existing pages by Repo ID (deduped)
  const existingByRepoId = keepById;

  let created = 0, updated = 0, skipped = 0;
  // 'archived' is already declared above to count duplicates; we'll also add to it for missing repos later.

  // Upsert current repos
  for (const repo of repos) {
    const res = await upsertRepo(NOTION_REPO_DB_ID, repo, existingByRepoId);
    created += res.created;
    updated += res.updated;
    skipped += res.skipped;
  }

  // Archive missing
  if (ARCHIVE_MISSING) {
    const tasks = [];
    for (const p of pages) {
      const rid = getPropNumber(p, "Repo ID");
      if (typeof rid === "number" && !liveIds.has(rid)) {
        tasks.push(
          notion.pages.update({
            page_id: p.id,
            archived: true,
          }).then(() => { archived += 1; })
        );
      }
    }
    await Promise.all(tasks);
  }

  console.log(JSON.stringify({ created, updated, skipped, archived }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
