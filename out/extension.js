"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
let statusBarItem;
function onTargetUpdate() {
    const config = vscode.workspace.getConfiguration();
    let val = config.get("rust-analyzer.cargo.target");
    let text = val ? val : "system";
    statusBarItem.text = `Rust: ${text}`;
}
function forTargets(callback) {
    [
        "rust-analyzer.cargo.target",
    ].forEach((t) => callback(t));
}
function activate(context) {
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    statusBarItem.command = "rust-analyzer-targets.setRustTarget";
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
    onTargetUpdate();
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration((ev) => {
        let affected = false;
        forTargets((t) => {
            if (ev.affectsConfiguration(t)) {
                affected = true;
            }
        });
        if (affected) {
            onTargetUpdate();
        }
    }));
    let disposable = vscode.commands.registerCommand("rust-analyzer-targets.setRustTarget", () => {
        const config = vscode.workspace.getConfiguration();
        const extConfig = config["rust-analyzer-targets"];
        const targets = extConfig["targets"];
        vscode.window.showQuickPick(targets).then((val) => {
            if (val !== undefined) {
                const target = val === "system" ? undefined : val;
                forTargets((t) => {
                    config.update(t, target, null);
                });
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map