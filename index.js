const fs = require("fs");

//Lagrange Interpolation
function lagrangeAtZero(points) {
  let sum = 0;
  const n = points.length;

  for (let i = 0; i < n; i++) {
    let [xi, yi] = points[i];
    let term = yi;
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      let [xj, _] = points[j];
      term *= (0 - xj) / (xi - xj);
    }
    sum += term;
  }

  return Math.round(sum);
}

// Process one input file
function processInputFile(filename) {
  const input = JSON.parse(fs.readFileSync(filename, "utf-8"));
  const k = input.keys.k;

  // Decode (x, y)
  let points = [];
  for (let key in input) {
    if (key === "keys") continue;
    const x = parseInt(key);
    const base = parseInt(input[key].base);
    const y = parseInt(input[key].value, base);
    points.push([x, y]);
  }

  // Use only first k points
  points = points.slice(0, k);

  const secret = lagrangeAtZero(points);

  // Save output JSON
  const outputFilename = `output-${filename}`;
  fs.writeFileSync(outputFilename, JSON.stringify({ secret }, null, 2));

  console.log(`✅ Processed ${filename} → ${outputFilename}`);
}

// Run for both inputs
processInputFile("input-1.json");
processInputFile("input-2.json");
