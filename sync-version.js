import fs from "fs";
import path from "path";
import {execSync} from "child_process";

function getGitTags() {
  const output = execSync("git tag", {encoding: "utf8"});
  return output
    .split("\n")
    .map(t => t.trim())
    .filter(Boolean)
    .filter(t => /^\d+\.\d+\.\d+$/.test(t));
}

function compareVersions(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  
  for (let i = 0; i < 3; i++) {
    if (pa[i] > pb[i]) return 1;
    if (pa[i] < pb[i]) return -1;
  }
  
  return 0;
}

function getLatestTag(tags) {
  return tags.sort(compareVersions).pop();
}

function updatePackageJson(version) {
  const pkgPath = path.resolve(process.cwd(), "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  
  pkg.version = version;
  
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log(`File package.json version updated to ${version}`);
}

const tags = getGitTags();

if (!tags.length) {
  console.error("No valid semver tags found.");
  process.exit(1);
}

const latest = getLatestTag(tags);
updatePackageJson(latest);
