#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// --------------------
// 1. CLI args
// --------------------
const projectName = process.argv[2] || "backend";
const root = path.join(process.cwd(), projectName);

// --------------------
// 2. Safety check
// --------------------
if (fs.existsSync(root)) {
  console.error(`❌ Folder "${projectName}" already exists.`);
  process.exit(1);
}

// --------------------
// 3. Folder structure
// --------------------
const folders = [
  "src",
  "src/routes",
  "src/controllers",
  "src/services",
  "src/models",
  "src/config",
  "src/middlewares",
];

// --------------------
// 4. Create folders
// --------------------
console.log("🚀 Creating backend project:", projectName);

fs.mkdirSync(root, { recursive: true });
folders.forEach((folder) => {
  fs.mkdirSync(path.join(root, folder), { recursive: true });
});

// --------------------
// 5. app.js
// --------------------
fs.writeFileSync(
  path.join(root, "src/app.js"),
  `const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const exampleRoutes = require("./routes/example.routes");
app.use("/api/examples", exampleRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
`
);

// --------------------
// 6. server.js
// --------------------
fs.writeFileSync(
  path.join(root, "server.js"),
  `require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});
`
);

// --------------------
// 7. Route file
// --------------------
fs.writeFileSync(
  path.join(root, "src/routes/example.routes.js"),
  `const express = require("express");
const router = express.Router();
const exampleController = require("../controllers/example.controller");

router.get("/", exampleController.getExamples);
router.post("/", exampleController.createExample);

module.exports = router;
`
);

// --------------------
// 8. Controller file
// --------------------
fs.writeFileSync(
  path.join(root, "src/controllers/example.controller.js"),
  `const exampleService = require("../services/example.service");

exports.getExamples = async (req, res, next) => {
  try {
    const data = await exampleService.getExamples();
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.createExample = async (req, res, next) => {
  try {
    const result = await exampleService.createExample(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
`
);

// --------------------
// 9. Service file
// --------------------
fs.writeFileSync(
  path.join(root, "src/services/example.service.js"),
  `exports.getExamples = async () => {
  return [
    { id: 1, name: "Example One" },
    { id: 2, name: "Example Two" },
  ];
};

exports.createExample = async (data) => {
  if (!data.name) {
    const err = new Error("Name is required");
    err.statusCode = 400;
    throw err;
  }

  return {
    id: Date.now(),
    name: data.name,
  };
};
`
);

// --------------------
// 10. Model placeholder
// --------------------
fs.writeFileSync(
  path.join(root, "src/models/example.model.js"),
  `// Example model placeholder
module.exports = {};
`
);

// --------------------
// 11. Error middleware
// --------------------
fs.writeFileSync(
  path.join(root, "src/middlewares/error.middleware.js"),
  `module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
`
);

// --------------------
// 12. env + gitignore
// --------------------
fs.writeFileSync(path.join(root, ".env"), "PORT=5000\n");

fs.writeFileSync(
  path.join(root, ".gitignore"),
  `node_modules
.env
`
);

// --------------------
// 13. README
// --------------------
fs.writeFileSync(
  path.join(root, "README.md"),
  `# ${projectName}

## Run project
\`\`\`bash
npm run dev
\`\`\`

## API
- GET  /api/examples
- POST /api/examples
`
);

// --------------------
// 14. Init npm
// --------------------
console.log("📦 Initializing npm...");
execSync("npm init -y", { cwd: root, stdio: "inherit" });

// --------------------
// 15. Update scripts
// --------------------
const pkgPath = path.join(root, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

pkg.scripts = {
  start: "node server.js",
  dev: "nodemon server.js",
};

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

// --------------------
// 16. Install deps
// --------------------
console.log("📦 Installing dependencies...");
execSync("npm install express cors dotenv", {
  cwd: root,
  stdio: "inherit",
});

execSync("npm install -D nodemon", {
  cwd: root,
  stdio: "inherit",
});

// --------------------
// 17. Done
// --------------------
console.log("✅ Backend setup complete!");
console.log(`👉 cd ${projectName}`);
console.log("👉 npm run dev");
