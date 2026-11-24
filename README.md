# claude-mods

A collection of mods for Claude Code and the Claude desktop app. Each mod lives in its own folder under `plugins/` and is listed in `.claude-plugin/marketplace.json`, so this repository works as a single marketplace that you add once and install mods from by name.

## Mods

| Mod | What it does |
| --- | --- |
| `neon-grid` | A dark-only theme with near-black glass surfaces, cyan accents with orange as the second accent, thin glowing message borders, monospace headings and tool rows, an animated perspective-grid backdrop with slow light trails, and an optional quiet synth ambience. |

## Install

At the prompt of a terminal Claude Code session:

```
/plugin install neon-grid --marketplace devondragon/claude-mods
```

From a shell:

```bash
claude plugin install neon-grid --marketplace devondragon/claude-mods
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `devondragon/claude-mods`, then Add plugin.

Answer `y` to add the marketplace, then pick a scope. This repository is private, so the install works only for people who can read it on GitHub and whose machine already holds a git credential for github.com (an SSH key, or `gh auth login` followed by `gh auth setup-git`).

## Adding a mod

Put the new mod in `plugins/<mod-name>/` (with its `.claude-plugin/plugin.json` and `hooks/`), add an entry to `.claude-plugin/marketplace.json` whose `source` is `./plugins/<mod-name>`, and run `claude plugin validate plugins/<mod-name>`.
