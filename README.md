# VSCode Rust Targets

[![badge](https://img.shields.io/visual-studio-marketplace/i/polymeilex.rust-targets?label=vs%20marketplace&style=flat-square)](https://marketplace.visualstudio.com/items?itemName=PolyMeilex.rust-targets)

Super simple extension to change rust target in VS Code without opening `setting.json`

![img](https://i.imgur.com/4XVZ5ko.png)

Written only for personal use, but maybe someone else also needs it, so here it is.
Enjoy!

# Settings

You can configure target list by adding this to your `seeting.json`

Choosing `system` will remove `rust.target` from setting, which in consequence sets your target to your current host system.

```json
"rust-targets.targets": [
    "system",
    "x86_64-pc-windows-gnu",
    "x86_64-apple-darwin",
    "wasm32-unknown-unknown",
    "x86_64-unknown-linux-gnu"
]
```
