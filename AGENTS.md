# AGENTS.md

## Package Manager

Use **pnpm** (not npm). The `pnpm-workspace.yaml` configures build script approvals.

## Commands

```bash
pnpm install              # Install dependencies
pnpm run build            # Full build: clean → extract → process-dump → tsc
pnpm run build:extract    # Extract from Dota 2 VPKs (requires local Dota 2 install)
pnpm run build:process-dump # Process dumper/dump file only (no Dota 2 needed)
pnpm run auto-dump        # Launch Dota 2 and dump API (requires Dota 2 + tools)
pnpm run test             # Jest tests
pnpm run lint             # ESLint + Prettier check
pnpm run fix:prettier     # Auto-fix formatting
```

## Project Structure

| Directory | Purpose |
|-----------|---------|
| `dumper/` | Lua scripts + TS launcher that dumps Dota 2 API via vConsole |
| `dumper/dump` | Raw dump output (MediaWiki table format) |
| `build/` | TypeScript scripts that parse dump → structured JSON |
| `files/` | Generated JSON + .d.ts output (git-tracked) |
| `src/` | Library code compiled to `lib/` |
| `skills/` | Agent Skill definition (TBD) |
| `test/` | Jest tests |

## Dump Format

The `dumper/dump` file uses MediaWiki table syntax (not TypeScript):

```
$> cl_panorama_script_help_2
=== ClassName ===
{| class="standard-table"
! Function ! Signature ! Description
|-
| MethodName | <code>Class.Method( type arg )</code> | Description |
|}
```

Sections are split by `$> command_name`. Key sections:
- `dump_panorama_css_properties` — CSS properties
- `dump_panorama_events` — Game events
- `cl_panorama_script_help_2` — Panorama enums + API classes
- `script_reload` / `cl_script_reload` — VScripts Lua API (JSON)

## Build Flow

1. `build:extract` — Reads VPK files from Dota 2 install, generates events/enums
2. `build:process-dump` — Parses `dumper/dump`, generates `files/**/*.json`
3. `build:tsc` — Compiles `src/` → `lib/`

For skill generation, only `build:process-dump` is needed (no VPK access).
