---
title: 配置速查与附录
description: 地址、链接、4K 参数与图片占位清单
---

### 9.1 配置速查表

| 项目 | 内容 |
| --- | --- |
| 中转站官网 | https://www.sivyer.cc |
| 定价 / 模型参考 | https://www.sivyer.cc/pricing |
| 控制台 | 登录后进入 Console |
| API 根地址 | `https://www.sivyer.cc` |
| OpenAI 兼容地址（常见） | `https://www.sivyer.cc/v1` |
| API Key | 控制台创建，形如 `sk-...` |
| 分组 | 按模型线路选择，选错会 403 / 无渠道 |
| 聊天 / 生图推荐工具 | Cherry Studio |
| CLI 配置推荐工具 | CC Switch |
| 日常生图 | Cherry「绘画」页调尺寸 / 质量 / 比例 |
| **4K 生图** | 对话助手自定义参数 `imageConfig.imageSize = "4K"` |

### 9.2 官方下载链接汇总

| 工具 | Windows | macOS | 发布页 |
| --- | --- | --- | --- |
| Cherry Studio | `*-x64-setup.exe` / `*-portable.exe` | `*-arm64.dmg` 或 `*-x64.dmg` | [Releases](https://github.com/CherryHQ/cherry-studio/releases) |
| CC Switch | `*-Windows.msi` / Portable.zip | `*-macOS.dmg` 或 `brew install --cask cc-switch` | [Releases](https://github.com/farion1231/cc-switch/releases) |

### 9.3 推荐学习路径（小白最短路径）

1. 注册登录 `www.sivyer.cc`
2. 充值（如需要）
3. 创建 Key，并选对分组
4. 安装 Cherry Studio，按「方式一」配好并聊天成功  
   —— 到这里，日常使用已经够了
5. 若要写代码：再装 CC Switch + Claude Code，按「方式一」启用供应商
6. 若要生图：先用「绘画」页跑通 1K；若要 4K，按 [生图详解](/cherry-studio/image-generation/) 中的「手动设置 4K」 给助手加自定义参数

### 9.4 4K 自定义参数速查（可直接复制）

```json
// 参数名：imageConfig（类型 JSON）
{
  "aspectRatio": "9:16",
  "imageSize": "4K"
}
```

```json
// 参数名：responseModalities（类型 JSON）
["TEXT", "IMAGE"]
```

### 9.5 图片占位清单（方便你批量补图）

建议在本教程同级创建 `images/` 文件夹，按序号替换：

| 编号 | 建议文件名 | 内容 |
| --- | --- | --- |
| 1-1 | `01-home.png` | 中转站首页 |
| 2-1 | `02-login-entry.png` | 登录入口 |
| 2-2 | `02-console.png` | 控制台首页 |
| 2-3 | `02-balance.png` | 余额/充值 |
| 3-1 | `03-cherry-win-download.png` | Cherry Windows 下载 |
| 3-2 | `03-cherry-win-install.png` | Cherry Windows 安装 |
| 3-3 | `03-cherry-mac-download.png` | Cherry macOS 下载 |
| 3-4 | `03-cherry-mac-install.png` | Cherry macOS 安装 |
| 3-5 | `03-cherry-ui.png` | Cherry 主界面 |
| 3-6 | `03-ccswitch-win.png` | CC Switch Windows 下载 |
| 3-7 | `03-ccswitch-mac.png` | CC Switch macOS 安装 |
| 3-8 | `03-ccswitch-ui.png` | CC Switch 主界面 |
| 3-9 | `03-claude-code.png` | Claude Code 启动成功 |
| 4-1 | `04-menu-token.png` | 密钥菜单入口 |
| 4-2 | `04-create-dialog.png` | 创建 Key 弹窗 |
| 4-3 | `04-name-quota.png` | 名称与额度 |
| 4-4 | `04-pricing-group.png` | 定价页分组提示 |
| 4-5 | `04-select-group.png` | 分组下拉框 |
| 4-6 | `04-copy-key.png` | 复制 Key |
| 4-7 | `04-copy-connection.png` | 复制连接信息（如有） |
| 5-1 | `05-cherry-newapi.png` | Cherry 填 NewAPI |
| 5-2 | `05-cherry-enabled.png` | Cherry 启用成功 |
| 5-3 | `05-ccswitch-add.png` | CC Switch 添加供应商 |
| 5-4 | `05-ccswitch-enable.png` | CC Switch 启用 |
| 5-5 | `05-manual-settings.png` | 手动改 settings.json |
| 5-6 | `05-curl-ok.png` | curl 测试成功 |
| 5-7 | `05-cursor-settings.png` | IDE 手动配置 |
| 6-1 | `06-image-models.png` | 定价页生图模型 |
| 6-2 | `06-endpoint-image.png` | 端点类型改为图像生成 |
| 6-3 | `06-drawing-entry.png` | 启动台绘画入口 |
| 6-4 | `06-drawing-ui.png` | 绘画页总览 |
| 6-5 | `06-drawing-size.png` | 尺寸/分辨率下拉 |
| 6-6 | `06-drawing-quality.png` | 质量选项 |
| 6-7 | `06-drawing-ratio.png` | 比例相关选项 |
| 6-8 | `06-drawing-params.png` | 完整参数面板 |
| 6-9 | `06-edit-assistant.png` | 编辑助手入口 |
| 6-10 | `06-param-imageconfig.png` | imageConfig=4K |
| 6-11 | `06-param-modalities.png` | responseModalities |
| 6-12 | `06-4k-result.png` | 4K 出图并查看属性 |
| 7-1 | `07-first-chat.png` | 首次对话成功 |
| 8-1 | `08-group-403.png` | 分组权限报错 |
| 8-2 | `08-language.png` | 语言切换 |

替换示例（Markdown）：

```markdown
![图 1-1：中转站首页](./images/01-home.png)
```

---

## 结束语

只要记住三件事，基本就不会配错：

1. **地址对：** `https://www.sivyer.cc`
2. **钥匙对：** 完整的 `sk-...`，且账户有余额
3. **分组对：** 创建 Key 时选择与目标模型一致的分组

生图再多记一句：

4. **默认「绘画」页通常到不了 4K；要 4K，请在助手自定义参数里写 `imageSize: "4K"`，并配上比例与 `responseModalities`。**

如果你在某一步卡住，把「完整报错原文 + 你使用的工具名称 + 所选分组」发给站长，排查会快很多。

祝使用顺利！
