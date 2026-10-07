"use strict";
const config = require("conventional-changelog-conventionalcommits");

module.exports = config({
  types: [
    { type: "feat", section: ":rocket: New Features" },
    { type: "fix", section: ":fire_extinguisher: Bugs" },
    { type: "docs", section: ":books: Documentation" },
    { type: "chore", section: ":broom: Chore" },
    { type: "chore(deps)", section: ":nut_and_bolt: Dependencies" },
  ],
});
