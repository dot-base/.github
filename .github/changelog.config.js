"use strict";
const config = require("conventional-changelog-conventionalcommits");

module.exports = config({
  types: [
    { type: "feat", section: ":rocket: New Features" },
    { type: "fix", section: ":fire_extinguisher: Bugs" },
    { type: "chore", section: ":broom: Chore" },
  ],
});
