const uuidv4 = require("uuid").v4;

function generateManifestTP(name, description) {
  const manifest = JSON.parse(`
        {
    "format_version": 2,
    "header": {
        "description": "${description}",
        "name": "${name}",
        "uuid": "${uuidv4()}",
        "pack_scope": "world",
        "version": [1, 0, 0],
        "min_engine_version": [1, 20, 0]
    },
    "modules": [
        {
            "type": "resources",
            "uuid": "${uuidv4()}",
            "version": [1, 0, 0]
        }
    ]
}
        `);

  return manifest;
}
console.log(
  JSON.stringify(generateManifestTP("NAMEEEEEEEEEEEE", "this is the desc"))
);

module.exports = generateManifestTP;
