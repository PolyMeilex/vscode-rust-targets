import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('rust-targets.setRustTarget', () => {
		const config = vscode.workspace.getConfiguration();
		const extConfig = config["rust-targets"];
		const targets: string[] = extConfig["targets"];

		vscode.window.showQuickPick(targets).then((val) => {
			if (val != undefined) {
				const target: string | undefined = val == "system" ? undefined : val;
				config.update("rust.target", target, true);
				vscode.window.showInformationMessage(`Target was set to: ${val}`);
			}
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
