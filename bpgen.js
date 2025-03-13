const uuidv4 = require("uuid").v4;

function generateManifestBP(
  name,
  description,
  TexturePackUUID,
  ScriptingAPI,
  author
) {
  const manifest = JSON.parse(`
        {
  "format_version": 2,
  "header": {
    "description": "${description}",
    "name": "${name}",
    "uuid": "${uuidv4()}",
    "version": [1, 0, 0],
    "min_engine_version": [1, 20, 0]
  },
  "modules": [
    {
      "type": "data",
      "uuid": "${uuidv4()}",
      "version": [1, 0, 0]
    }
  ],
  "dependencies": [
    
  ]
}

        `);

  if (ScriptingAPI) {
    manifest.dependencies.push({
      module_name: "@minecraft/server",
      version: "1.17.0",
    });
    manifest.modules.push({
      type: "script",
      uuid: uuidv4(),
      version: [1, 0, 0],
      entry: "scripts/main.js",
    });
  }
  if (TexturePackUUID) {
    manifest.dependencies.push({
      uuid: TexturePackUUID,
      version: [1, 0, 0],
    });
  }
  if (author) {
    manifest.metadata = {
      authors: [author],
      license: "MIT",
    };
  }

  Object.keys(manifest).forEach((key) => {
    const keyValue = JSON.stringify(manifest[key]);
    if (keyValue === "[]") {
      delete manifest[key];
    }
  });

  return manifest;
}
console.log(
  JSON.stringify(
    generateManifestBP(
      "NAMEEEEEEEEEEEE",
      "this is the desc",
      null,
      true,
      "MoDevIO"
    )
  )
);

module.exports = generateManifestBP;
