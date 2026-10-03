const fs = require('fs');
const path = require('path');

const targetFile = path.join(
  __dirname,
  '..',
  'node_modules',
  '@react-native',
  'gradle-plugin',
  'build.gradle.kts'
);

if (!fs.existsSync(targetFile)) {
  console.log('React Native Gradle plugin not found, skipping patch.');
  process.exit(0);
}

let content = fs.readFileSync(targetFile, 'utf8');

// 1. Remove deprecated serviceOf import removed in Gradle 8.13+
content = content.replace(/import org\.gradle\.configurationcache\.extensions\.serviceOf/g, '');

// 2. Remove testRuntimeOnly block using serviceOf
content = content.replace(/testRuntimeOnly\([\s\S]*?\.first\(\)\)\)/g, '');

// 3. Add -Xskip-metadata-version-check to KotlinCompile options
if (!content.includes('skip-metadata-version-check')) {
  content = content.replace(
    /languageVersion = "1\.5"/,
    'languageVersion = "1.5"\n    freeCompilerArgs = freeCompilerArgs + "-Xskip-metadata-version-check"'
  );
}

fs.writeFileSync(targetFile, content);
console.log('Successfully patched @react-native/gradle-plugin/build.gradle.kts');
