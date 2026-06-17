---
name: dota2-script-ref
description: Dota 2 custom game API reference for Panorama JS and VScripts Lua. Use when writing Dota 2 custom game code, looking up API methods, classes, enums, game events, or Panorama CSS properties.
---

# Dota 2 Script Reference

Dota 2 自定义游戏 API 参考，涵盖 Panorama (JS) 和 VScripts (Lua)。

## Reference Files

### Panorama (Frontend - JavaScript)

| File | Content         |
|------|-----------------|
| `reference/panorama/api.json` | Panorama JS API |
| `reference/panorama/enums.json` | Panorama 枚举     |
| `reference/panorama/events.json` | Panorama 事件     |
| `reference/panorama/css.json` | Panorama CSS 属性 |

### VScripts (Backend - Lua)

| File | Content          |
|------|------------------|
| `reference/vscripts/api.json` | VScripts Lua API |
| `reference/vscripts/api-types.json` | VScripts 类型声明    |
| `reference/vscripts/enums.json` | VScripts 枚举和常量   |

## Usage

This skill provides API reference data for agents writing Dota 2 custom game code.

### Panorama JS API

Panorama JavaScript uses **namespace.function()** calling convention:

```javascript
// $.Msg() - $ namespace global function
$.Msg(Players.GetLocalPlayer());

// GameEvents.Subscribe() - GameEvents namespace
GameEvents.Subscribe('game_rules_state_change', function(data) {
    $.Msg('State changed!');
});

// Panel methods - called on panel instances
var panel = $.GetContextPanel();
panel.SetHasClass('active', true);
```

When writing Panorama code, consult `reference/panorama/api.json` to:
- Find available namespaces (e.g., `$`, `GameEvents`, `Players`, `Panel`)
- Check method signatures (parameter types and return types)
- Read method descriptions

### VScripts Lua API

VScripts Lua uses **Class:Method()** or global function calling convention:

```lua
-- Global function
PrintTable(GameRules:GetGameTime())

-- Class method
local hero = PlayerResource:GetSelectedHeroEntity(playerID)
hero:AddNewModifier(caster, ability, modifier_name, {})
```

When writing VScripts code, consult `reference/vscripts/api.json` to:
- Find available classes and their methods
- Check method signatures
- Understand class inheritance (extend field)

### Enums

Enums are accessed by name in both languages:

```javascript
// Panorama JS
if (Players.GetTeam(playerID) === DOTATeam_t.DOTA_TEAM_GOODGUYS) { ... }
```

```lua
-- VScripts Lua
if unit:GetTeam() == DOTA_TEAM_GOODGUYS then ... end
```

Consult `reference/panorama/enums.json` or `reference/vscripts/enums.json` for enum values.

## Data Structure

### Panorama API (`panorama/api.json`)

```json
[
  {
    "name": "CPanoramaScript_GameEvents",
    "namespace": "GameEvents",
    "methods": [
      {
        "name": "Subscribe",
        "args": [
          { "name": "pEventName", "type": "string" },
          { "name": "funcVal", "type": "any" }
        ],
        "returns": "number",
        "description": "Subscribe to a game event"
      }
    ]
  }
]
```

### Panorama Enums (`panorama/enums.json`)

```json
[
  {
    "name": "DOTA_GameState",
    "members": [
      { "name": "DOTA_GAMERULES_STATE_INIT", "value": 0 },
      { "name": "DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD", "value": 1 }
    ]
  }
]
```
