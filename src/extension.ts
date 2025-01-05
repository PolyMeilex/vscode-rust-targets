import * as vscode from "vscode";

const TARGET_KEY = "rust-analyzer.cargo.target";

export function activate(context: vscode.ExtensionContext) {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    0,
  );
  statusBarItem.command = "rust-targets.setRustTarget";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  function onTargetUpdate() {
    const config = vscode.workspace.getConfiguration();
    const val = config.get(TARGET_KEY);
    const text = val ? val : "system";
    statusBarItem.text = `Rust: ${text}`;
  }

  onTargetUpdate();

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((ev) => {
      if (ev.affectsConfiguration(TARGET_KEY)) {
        onTargetUpdate();
      }
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("rust-targets.setRustTarget", () => {
      const config = vscode.workspace.getConfiguration();
      const extConfig = config["rust-targets"];
      const targets: string[] = extConfig["targets"];

      vscode.window.showQuickPick(targets).then((target) => {
        if (target === undefined) {
          return;
        }

        if (target === "system") {
          config.update(TARGET_KEY, null, true);
        } else {
          config.update(TARGET_KEY, target, true);
        }
      });
    }),
  );
}

export function deactivate() {}
