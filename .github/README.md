# dota2-script-ref

Dota 2 自定义游戏 API 参考 Skill

本项目从 Dota 2 客户端提取 API 数据，生成结构化的 JSON 文件，组装 Agent Skill。

## 目标项目

本 Skill 服务于 Dota 2 自定义游戏：
- 前端: Lua (VScripts)
- 后端: JavaScript (Panorama)

该 Skill **不适合** Typescript 项目。

## 快速开始

### 开发前置要求

- Node.js >= 12.13.0
- pnpm
- Dota 2（用于 auto-dump）

### 生成参考数据

```bash
# 安装依赖
pnpm install

# 从现有 dump 文件生成（不需要 Dota 2）
pnpm run build

# 或从 Dota 2 客户端重新 dump（需要 Dota 2 + 工具）
pnpm run auto-dump
pnpm run build:process-dump
```
