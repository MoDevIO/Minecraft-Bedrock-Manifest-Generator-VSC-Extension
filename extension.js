const generateManifestBP = require("./bpgen");
const generateManifestTP = require("./tpgen");
const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("Extension is now active!");

  const BPGenCommand = vscode.commands.registerCommand(
    "minecraft-bedrock-manifest-generator.bpmanifest",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        if (
          `${JSON.stringify(editor.document.fileName).split("\\").pop()}` ===
          `manifest.json"`
        ) {
          const name = await vscode.window.showInputBox({ prompt: "Name" });
          const description = await vscode.window.showInputBox({
            prompt: "Description",
          });
          const scriptAPI_temp = await vscode.window.showQuickPick(
            ["Yes", "No"],
            {
              placeHolder: "ScriptingAPI",
            }
          );
          if (scriptAPI_temp === "Yes") {
            var scriptAPI = true;
          }
          const TexturePackUUID = await vscode.window.showInputBox({
            prompt: "TexturePackUUID",
          });
          const author = await vscode.window.showInputBox({ prompt: "Author" });

          editor.edit((editBuilder) => {
            editBuilder.insert(
              new vscode.Position(0, 0),
              JSON.stringify(
                generateManifestBP(
                  name,
                  description,
                  TexturePackUUID,
                  scriptAPI,
                  author
                )
              )
            );
          });
        } else {
          vscode.window.showErrorMessage(
            "The active editor is not a manifest.json file!"
          );
        }
      } else {
        vscode.window.showErrorMessage("No active document!");
      }
    }
  );
  const TPGenCommand = vscode.commands.registerCommand(
    "minecraft-bedrock-manifest-generator.tpmanifest",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        if (
          `${JSON.stringify(editor.document.fileName).split("\\").pop()}` ===
          `manifest.json"`
        ) {
          const name = await vscode.window.showInputBox({ prompt: "Name" });
          const description = await vscode.window.showInputBox({
            prompt: "Description",
          });

          editor.edit((editBuilder) => {
            editBuilder.insert(
              new vscode.Position(0, 0),
              JSON.stringify(generateManifestTP(name, description))
            );
          });
        } else {
          vscode.window.showErrorMessage(
            "The active editor is not a manifest.json file!"
          );
        }
      } else {
        vscode.window.showErrorMessage("No active document!");
      }
    }
  );

  context.subscriptions.push(BPGenCommand);
  context.subscriptions.push(TPGenCommand);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
