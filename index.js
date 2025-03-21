#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Get arguments from the command line
const args = process.argv.slice(2);
const componentName = args[0];
const customPath = args[1] || "src/components"; // Default to "src/components"

// Validate component name
if (!componentName) {
  console.error("Error: Please provide a component name.");
  console.error("Usage: create-component <ComponentName> [path/to/directory]");
  process.exit(1);
}

// Resolve the full path for the component
const componentDir = path.resolve(process.cwd(), customPath, componentName);
const indexFile = path.join(componentDir, "index.ts");
const componentFile = path.join(componentDir, `${componentName}.tsx`);

// Create the component directory
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
  console.log(`Created directory: ${componentDir}`);
} else {
  console.warn(`Warning: Directory already exists: ${componentDir}`);
}

// Create the index.ts file
fs.writeFileSync(
  indexFile,
  `export * from "./${componentName}";\n`
);
console.log(`Created file: ${indexFile}`);

// Create the ComponentName.tsx file
fs.writeFileSync(
  componentFile,
  `interface ${componentName}Props {

}

export const ${componentName} = ({}: ${componentName}Props) => {
  return (
    <></>
  );
}
`
);
console.log(`Created file: ${componentFile}`);

// Success message
console.log(`Component "${componentName}" created successfully!`);