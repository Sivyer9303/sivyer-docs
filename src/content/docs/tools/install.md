---
title: 工具下载与安装
description: Cherry Studio、CC Switch、Claude Code 的 Win/Mac 安装
---

下面推荐两套最常用工具（与本站首页推荐一致）：

| 工具 | 适合谁 | 主要用途 |
| --- | --- | --- |
| **Cherry Studio** | 想聊天、写作、**生图** 的用户 | 图形化 AI 聊天 + 绘画客户端 |
| **CC Switch** | 想用 Claude Code / Codex 写代码的用户 | 一键管理/切换中转站配置 |

你也可以两个都装：日常聊天/生图用 Cherry Studio，写代码用 CC Switch。  
**生图（含分辨率、质量、比例、4K 手动设置）请重点看[Cherry Studio 生图详解](/cherry-studio/image-generation/)。**

---

### 3.1 Cherry Studio（聊天客户端）

#### 3.1.1 官方下载地址

- **官网 / 文档：** [https://cherry-ai.com](https://cherry-ai.com)（若打不开，直接用 GitHub）
- **GitHub 下载页（推荐）：** [https://github.com/CherryHQ/cherry-studio/releases](https://github.com/CherryHQ/cherry-studio/releases)
- **NewAPI 官方配置说明：** [https://docs.cherry-ai.com/docs/zh-cn/pre-basic/providers/newapi](https://docs.cherry-ai.com/docs/zh-cn/pre-basic/providers/newapi)

> ⚠️ 请只从 **官方 GitHub Releases** 或官网下载，不要从不明网盘/第三方「破解站」下载。

#### 3.1.2 Windows 系统：下载与安装

1. 打开 [Cherry Studio Releases](https://github.com/CherryHQ/cherry-studio/releases)
2. 找到最新版本（页面最上方）
3. 普通电脑（绝大多数）下载：
   - `Cherry-Studio-xxxxx-x64-setup.exe`（安装版，推荐）
   - 或 `Cherry-Studio-xxxxx-x64-portable.exe`（便携版，免安装）
4. 若是 ARM 设备，选择文件名带 `arm64` 的版本
5. 双击 `.exe`，按安装向导一路「下一步」
6. 安装完成后，从开始菜单或桌面打开 **Cherry Studio**

> 📷【请替换图片】  
> **图 3-1：Cherry Studio GitHub 下载页（Windows）**  
> 圈出 `x64-setup.exe` 文件

> 📷【请替换图片】  
> **图 3-2：Windows 安装过程**  
> 安装向导任意一页即可

**Windows 常见提示：**

- 若 SmartScreen 提示「未知应用」，点「更多信息」→「仍要运行」（确认来源是官方 GitHub 后再操作）
- 杀毒软件误报时，可先添加信任，或换用便携版

#### 3.1.3 macOS 系统：下载与安装

1. 打开 [Cherry Studio Releases](https://github.com/CherryHQ/cherry-studio/releases)
2. 按电脑芯片选择：
   - **Apple Silicon（M1/M2/M3/M4）：** `Cherry-Studio-xxxxx-arm64.dmg`
   - **Intel 芯片 Mac：** `Cherry-Studio-xxxxx-x64.dmg`
3. 如何确认芯片类型：
   - 点击左上角苹果菜单 →「关于本机」
   - 看到「芯片」为 Apple M 系列 → 下 `arm64`
   - 看到「处理器」为 Intel → 下 `x64`
4. 打开 `.dmg`，把 **Cherry Studio** 拖进「应用程序（Applications）」
5. 从启动台或应用程序文件夹打开

> 📷【请替换图片】  
> **图 3-3：Cherry Studio GitHub 下载页（macOS）**  
> 圈出 `arm64.dmg` / `x64.dmg`

> 📷【请替换图片】  
> **图 3-4：macOS 拖入 Applications**  
> dmg 安装窗口截图

**macOS「无法打开，因为来自身份不明的开发者」处理：**

1. 打开「系统设置」→「隐私与安全性」
2. 找到被拦截的应用提示，点击「仍要打开」
3. 或在应用图标上右键 →「打开」→ 再次确认

#### 3.1.4 Cherry Studio 基本使用（先熟悉界面）

1. 打开软件后，先进入 **设置**
2. 找到 **模型服务 / 服务商** 相关页面（后续在 [配置中转站](/configure/) 会详细配置 NewAPI）
3. 主界面用于新建对话、选择模型、发送消息
4. 顶部标签栏右侧点 **「+」** 打开启动台，可进入内置 **「绘画」**（文生图）；**4K / 精细比例** 等高级玩法见 **[Cherry Studio 生图详解](/cherry-studio/image-generation/)**

> 📷【请替换图片】  
> **图 3-5：Cherry Studio 主界面**  
> 标注：新建对话、模型选择、设置入口、启动台「+」位置

---

### 3.2 CC Switch（中转配置 / CLI 切换工具）

CC Switch 可以把本站的 API 地址和 Key 一键写入 Claude Code、Codex 等工具，免去手改配置文件。

#### 3.2.1 官方下载地址

- **官网下载页：** [https://ccswitch.io/en/download](https://ccswitch.io/en/download)（中文可看 [https://ccswitch.io](https://ccswitch.io)）
- **GitHub 下载页（推荐）：** [https://github.com/farion1231/cc-switch/releases](https://github.com/farion1231/cc-switch/releases)
- **供应商配置教程：** [https://cc-switch.cc/tutorials/provider-setup](https://cc-switch.cc/tutorials/provider-setup)

> ⚠️ 唯一官方渠道是官网与上述 GitHub。不要相信任何「付费下载 CC Switch」的网站。

#### 3.2.2 Windows 系统：下载与安装

1. 打开 [CC Switch Releases](https://github.com/farion1231/cc-switch/releases)
2. 推荐下载：
   - `CC-Switch-vX.X.X-Windows.msi`（安装版，推荐）
   - 或 `CC-Switch-vX.X.X-Windows-Portable.zip`（便携版）
3. 双击 `.msi` 完成安装
4. 从开始菜单启动 **CC Switch**

> 📷【请替换图片】  
> **图 3-6：CC Switch Windows 下载文件列表**  
> 圈出 `.msi` 文件

#### 3.2.3 macOS 系统：下载与安装

**方式 A：Homebrew（推荐，方便更新）**

若已安装 Homebrew，在「终端」执行：

```bash
brew install --cask cc-switch
```

更新：

```bash
brew upgrade --cask cc-switch
```

**方式 B：手动下载**

1. 打开 [CC Switch Releases](https://github.com/farion1231/cc-switch/releases)
2. 下载 `CC-Switch-vX.X.X-macOS.dmg`（推荐）
3. 打开 dmg，拖到「应用程序」
4. 启动 **CC Switch**

> 📷【请替换图片】  
> **图 3-7：CC Switch macOS 下载 / 安装**  
> dmg 拖入 Applications 的截图

#### 3.2.4 CC Switch 基本使用（先认识界面）

1. 打开 CC Switch 主界面
2. 右上角通常有 **「+」**，用于添加供应商（中转站）
3. 添加后，点击 **启用**，即可把配置同步到 Claude Code / Codex 等工具
4. 也可通过系统托盘快速切换供应商

> 📷【请替换图片】  
> **图 3-8：CC Switch 主界面**  
> 标注：「+」添加按钮、启用按钮、供应商列表

> **小白提示：**  
> CC Switch 本身不是聊天软件，它是「配置管家」。真正对话/写代码仍要打开 Claude Code、Codex 或 Cherry Studio。

---

### 3.3（可选）Claude Code 命令行工具

如果你要用 **Claude Code** 写代码，还需要安装 Claude Code 本身：

- **官方说明：** [https://docs.anthropic.com/en/docs/claude-code](https://docs.anthropic.com/en/docs/claude-code)
- 常见安装方式（需本机已安装 Node.js）：

```bash
npm install -g @anthropic-ai/claude-code
```

安装后，在终端输入 `claude` 启动。  
**中转站连接** 建议优先用 CC Switch 配置（见第 5 章方式一），比手改环境变量更不容易出错。

> 📷【请替换图片】  
> **图 3-9：终端中成功启动 Claude Code**  
> 显示 `claude` 命令可运行即可

---
