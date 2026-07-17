import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import util from "node:util";

const execAsync = util.promisify(exec);

// 1. Get the target path from the command line arguments
const targetPath = process.argv[2];

if (!targetPath) {
  console.error("❌ Error: Please provide a path to a package.json file.");
  console.log("Usage: node update-package.js <path/to/package.json>");
  process.exit(1);
}

// Resolve the absolute path based on where the user ran the command
const packageJsonPath = path.resolve(process.cwd(), targetPath);

// 2. Validate that the file exists
if (!fs.existsSync(packageJsonPath)) {
  console.error(`❌ Error: File not found at ${packageJsonPath}`);
  process.exit(1);
}

if (!packageJsonPath.endsWith("package.json")) {
  console.warn("⚠️ Warning: The provided file does not end with 'package.json'. Proceeding anyway...");
}

// 3. Read and parse the target package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// 4. Extract all dependencies and devDependencies dynamically
const deps = packageJson.dependencies ? Object.keys(packageJson.dependencies) : [];
const devDeps = packageJson.devDependencies ? Object.keys(packageJson.devDependencies) : [];

// Combine and deduplicate just in case a package is mistakenly in both
const packagesToUpdate = Array.from(new Set([...deps, ...devDeps]));

if (packagesToUpdate.length === 0) {
  console.log("No dependencies or devDependencies found in this package.json.");
  process.exit(0);
}

console.log(`Analyzing: ${packageJsonPath}`);
console.log(`Found ${packagesToUpdate.length} packages. Fetching latest versions...\n`);

// 5. Loop through extracted packages and fetch versions
for (const pkg of packagesToUpdate) {
  try {
    const { stdout } = await execAsync(`npm view ${pkg} version`);
    const latestVersion = stdout.trim();

    let updated = false;

    // Check and update in dependencies
    if (packageJson.dependencies && packageJson.dependencies[pkg]) {
      packageJson.dependencies[pkg] = `${latestVersion}`;
      console.log(`Updated \x1b[32m${pkg}\x1b[0m in dependencies to ${latestVersion}`);
      updated = true;
    } 
    
    // Check and update in devDependencies
    if (packageJson.devDependencies && packageJson.devDependencies[pkg]) {
      packageJson.devDependencies[pkg] = `${latestVersion}`;
      console.log(`Updated \x1b[32m${pkg}\x1b[0m in devDependencies to ${latestVersion}`);
      updated = true;
    }

  } catch (error) {
    console.error(`Failed to fetch version for \x1b[31m${pkg}\x1b[0m:`, error.message);
  }
}

// 6. Write the updated object back to the target package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
console.log(`\n✅ Successfully updated ${packageJsonPath}!`);
console.log(`Run 'npm install' inside ${path.dirname(packageJsonPath)} to apply the changes.`);