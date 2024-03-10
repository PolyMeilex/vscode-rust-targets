import * as vscode from "vscode";

let statusBarItem: vscode.StatusBarItem;

function onTargetUpdate() {
  const config = vscode.workspace.getConfiguration();
  let val = config.get("rust-analyzer.cargo.target");
  let text = val ? val : "system";
  statusBarItem.text = `Rust: ${text}`;
}

function forTargets(callback: (t: string) => void) {
  [
    "rust-analyzer.cargo.target",
  ].forEach((t) => callback(t));
}

export function activate(context: vscode.ExtensionContext) {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    0
  );
  statusBarItem.command = "rust-targets.setRustTarget";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  onTargetUpdate();

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((ev) => {
      let affected = false;
      forTargets((t) => {
        if (ev.affectsConfiguration(t)) {
          affected = true;
        }
      });
      if (affected) {
        onTargetUpdate();
      }
    })
  );

  let disposable = vscode.commands.registerCommand(
    "rust-targets.setRustTarget",
    () => {
      const config = vscode.workspace.getConfiguration();
      const extConfig = config["rust-targets"];
      const targets: string[] = extConfig["targets"];

      vscode.window.showQuickPick(targets).then((val) => {
        if (val !== undefined) {
          const target: string | undefined = val === "system" ? undefined : val;
          forTargets((t) => {
            config.update(t, target, false);
          });
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() { }
