---
title: 配置中转站
description: 工具配置与手动配置两种方式
---

下面至少提供两种配置方法：

1. **方式一：使用工具配置（推荐小白）** —— Cherry Studio / CC Switch  
2. **方式二：自行手动配置** —— 手改配置文件 / 环境变量 / API 调用

无论哪种方式，核心都是两样东西：

| 项目 | 值 |
| --- | --- |
| 中转站地址（Base URL） | `https://www.sivyer.cc` |
| API Key | 你刚复制的 `sk-...` |

> **注意：**  
> - 多数图形客户端填 **根地址** `https://www.sivyer.cc`（不要带 `/chat/completions`）  
> - 某些 OpenAI 兼容场景需要 `https://www.sivyer.cc/v1`  
> - 以具体工具说明为准；填错路径是新手最常见问题之一

---

### 方式一：使用工具配置（推荐）

#### 5.1 用 Cherry Studio 配置（适合聊天）

1. 打开 **Cherry Studio**
2. 进入 **设置 → 模型服务**
3. 找到内置服务商 **New API**（名称可能显示为 NewAPI / New API）
4. 填写：
   - **API 密钥：** 粘贴你的 `sk-...`
   - **API 地址：** `https://www.sivyer.cc`
5. 点击 **获取模型** 或手动添加你要用的模型名（可从本站 [定价页](https://www.sivyer.cc/pricing) / 模型广场对照）
6. 点 **检测 / 测试**
7. 测试通过后，打开右上角 **启用** 开关
8. 回到对话页，选择该服务商下的模型，发送一句「你好」测试

> 📷【请替换图片】  
> **图 5-1：Cherry Studio → 模型服务 → New API**  
> 标注 API 密钥、API 地址填写位置

> 📷【请替换图片】  
> **图 5-2：检测成功并启用**  
> 显示检测通过 / 启用开关打开

**Cherry Studio 填写注意：**

- 一般只填根地址：`https://www.sivyer.cc`
- **不要**填成 `https://www.sivyer.cc/v1/chat/completions`
- 只有当中转站明确要求「无版本路径」时，才在地址末尾加 `#`（普通 NewAPI 通常不需要）

---

#### 5.2 用 CC Switch 配置（适合 Claude Code / Codex）

1. 打开 **CC Switch**
2. 点击右上角 **「+」**
3. 推荐优先使用：
   - **统一供应商（Universal Provider）**，或
   - **预设 / 自定义** 中选择接近 NewAPI / 自定义网关 的选项
4. 填写示例：

| 字段 | 填写内容 |
| --- | --- |
| 名称 | `Sivyer中转`（可自定义） |
| API Key | 你的 `sk-...` |
| API 地址 / Base URL | `https://www.sivyer.cc` |
| 同步到的应用 | 勾选你实际使用的：Claude Code / Codex / Gemini CLI 等 |
| 默认模型 | 从本站定价页选一个你有权限的模型名 |

5. 点击 **添加 / 保存**
6. 回到主界面，选中刚添加的供应商，点击 **启用**
7. **重新打开终端**（或重启对应 CLI），再启动 Claude Code / Codex

> 📷【请替换图片】  
> **图 5-3：CC Switch 添加供应商面板**  
> 标注名称、API Key、Base URL

> 📷【请替换图片】  
> **图 5-4：启用供应商成功**  
> 主界面显示当前启用的是「Sivyer中转」

**CC Switch 使用小技巧：**

- 切换供应商后，若 CLI 仍走旧配置，先 **关掉旧终端窗口再开一个新的**
- Claude Code 有时无需重启即可生效，但不确定时重启最省事
- 想恢复官方登录时，可再添加「官方登录」类预设并启用

---

### 方式二：自行手动配置（不依赖一键工具）

适合：不喜欢额外软件、或工具导入失败时的兜底方案。

#### 5.3 手动配置 Claude Code

Claude Code 常用配置文件：

- macOS / Linux：`~/.claude/settings.json`
- Windows：一般在用户目录下的 `.claude\settings.json`

可用如下结构（示例）：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://www.sivyer.cc",
    "ANTHROPIC_AUTH_TOKEN": "sk-你的密钥"
  }
}
```

也可以同时保留：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://www.sivyer.cc",
    "ANTHROPIC_API_KEY": "sk-你的密钥",
    "ANTHROPIC_AUTH_TOKEN": "sk-你的密钥"
  }
}
```

保存后：

1. 关闭所有旧的终端窗口
2. 新开终端，执行 `claude`
3. 发送一条测试消息

> 📷【请替换图片】  
> **图 5-5：手动编辑 Claude Code 的 settings.json**  
> 可用编辑器打开该文件的截图（请打码 Key）

**临时环境变量方式（仅当前终端会话有效）：**

macOS / Linux：

```bash
export ANTHROPIC_BASE_URL="https://www.sivyer.cc"
export ANTHROPIC_AUTH_TOKEN="sk-你的密钥"
claude
```

Windows PowerShell：

```powershell
$env:ANTHROPIC_BASE_URL="https://www.sivyer.cc"
$env:ANTHROPIC_AUTH_TOKEN="sk-你的密钥"
claude
```

---

#### 5.4 手动配置 OpenAI 兼容客户端 / 代码调用

很多工具只要填：

- **Base URL：** `https://www.sivyer.cc/v1`
- **API Key：** `sk-你的密钥`
- **Model：** 定价页上的模型名（必须完全一致）

用 `curl` 快速自测（把 Key 和模型名换成你的）：

```bash
curl https://www.sivyer.cc/v1/chat/completions \
  -H "Authorization: Bearer sk-你的密钥" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "这里填定价页上的模型名",
    "messages": [{"role": "user", "content": "你好，请只回复：配置成功"}]
  }'
```

若返回正常的 JSON 回复，说明中转站、Key、分组基本都通了。

> 📷【请替换图片】  
> **图 5-6：curl 测试成功返回**  
> 终端里出现模型回复内容（可打码 Key）

---

#### 5.5 在 Cursor 等 IDE 中手动配置（可选）

不同版本 Cursor 的设置入口可能不同，通用思路是：

1. 打开设置中与 **Models / OpenAI Compatible / API Keys** 相关的页面
2. 启用「兼容 OpenAI 的自定义接口」或类似选项
3. 填入：
   - Base URL：`https://www.sivyer.cc/v1`（若要求根地址则去掉 `/v1`）
   - API Key：你的 `sk-...`
4. 选择/填写本站支持的模型名
5. 发送测试对话

> 📷【请替换图片】  
> **图 5-7：Cursor（或你使用的 IDE）自定义模型设置页**  
> 标注 Base URL 与 API Key 输入框

---
