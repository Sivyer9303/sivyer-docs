# 截图文件清单（中文文件名）

当前未替换的截图是**带文件名的 SVG 占位图**（能直接看出对应哪张）。

本地 `npm run dev` 下点击占位图粘贴截图后，工具会：
1. 自动转成 PNG
2. 写入同名 `xxx.png`
3. 删掉占位 `xxx.svg`，并把文档引用改成 `.png`

因此你**不需要**自己把 PNG 转成 SVG。

## 本地一键替换（推荐）

运行 `npm run dev` 后打开文档页：

1. 截图区域右上角会显示蓝色 **「点击替换」**
2. 点击图片 → 弹窗里 **Ctrl/Cmd + V 粘贴**，或选择/拖拽文件
3. 工具会自动转成 PNG，并覆盖 `public/screenshots/` 里对应文件  
4. 页面图片会立刻刷新；占位图和真实图都可以反复替换  

该能力**只在本地开发服务器**启用，正式构建 / Cloudflare 部署不会带上。

看文件名就能知道拍什么。

| 文件名 | 应拍摄的内容 |
| --- | --- |
| `获取API-01-控制台首页.svg` → 替换后变为 `获取API-01-控制台首页.png` | 登录后的控制台首页（余额、菜单清晰可见） |
| `获取API-02-登录入口.svg` → 替换后变为 `获取API-02-登录入口.png` | 注册/登录入口 |
| `获取API-03-余额与充值.svg` → 替换后变为 `获取API-03-余额与充值.png` | 余额与充值入口 |
| `获取API-04-兑换码.svg` → 替换后变为 `获取API-04-兑换码.png` | 站内钱包兑换码 / 卡密兑换界面 |
| `创建Key-01-密钥菜单入口.svg` → 替换后变为 `创建Key-01-密钥菜单入口.png` | 密钥菜单入口 |
| `创建Key-02-创建弹窗.svg` → 替换后变为 `创建Key-02-创建弹窗.png` | 创建弹窗总览 |
| `创建Key-03-定价页分组提示.svg` → 替换后变为 `创建Key-03-定价页分组提示.png` | 定价页上的分组提示 |
| `创建Key-04-分组下拉框.svg` → 替换后变为 `创建Key-04-分组下拉框.png` | 创建 Key 时的分组下拉框 |
| `CCSwitch-Tab切换位置.png` | CC Switch 顶部工具 Tab 切换位置（圈出 Tab 栏） |
| `CCSwitch-02-添加供应商面板.svg` → 替换后变为 `CCSwitch-02-添加供应商面板.png` | 已选中某工具 Tab 后的添加供应商面板 |
| `CCSwitch-03-启用供应商成功.svg` → 替换后变为 `CCSwitch-03-启用供应商成功.png` | 在该 Tab 下启用供应商成功 |
| `Codex++-01-主界面.svg` → 替换后变为 `Codex++-01-主界面.png` | Codex++ 主界面 / 供应商配置入口 |
| `Codex++-02-添加供应商纯API.svg` → 替换后变为 `Codex++-02-添加供应商纯API.png` | 添加供应商（纯 API）填写示例 |
| `Codex++-03-Codex目标填写.svg` → 替换后变为 `Codex++-03-Codex目标填写.png` | Codex 目标 Base URL / Key |
| `Codex++-04-保存并重启.svg` → 替换后变为 `Codex++-04-保存并重启.png` | 保存并重启成功 |
| `ClaudeCode-01-对话成功.svg` → 替换后变为 `ClaudeCode-01-对话成功.png` | Claude Code 成功对话 |
| `ClaudeCode桌面-01-第三方推理配置.svg` → 替换后变为 `ClaudeCode桌面-01-第三方推理配置.png` | Claude Desktop：Developer → Configure Third-Party Inference（Gateway） |
| `ClaudeCode桌面-02-对话成功.svg` → 替换后变为 `ClaudeCode桌面-02-对话成功.png` | Claude Code 桌面版 Code 工作区对话成功 |
| `Codex桌面-01-打开config.svg` → 替换后变为 `Codex桌面-01-打开config.png` | Codex App：Settings → Configuration → Open config.toml |
| `Codex桌面-02-config示例.svg` → 替换后变为 `Codex桌面-02-config示例.png` | Codex 用户级 config.toml 自定义 model_providers 示例 |
| `Cursor-01-Cursor++侧边栏配置.svg` → 替换后变为 `Cursor-01-Cursor++侧边栏配置.png` | Cursor++（CCursor）侧边栏：BYOK 开关与供应商配置 |
| `Cursor-02-BYOK对话成功.svg` → 替换后变为 `Cursor-02-BYOK对话成功.png` | Cursor++ 选用自备模型后对话成功 |
| `OpenClaw-01-CCSwitch中选中Tab.svg` → 替换后变为 `OpenClaw-01-CCSwitch中选中Tab.png` | CC Switch 中选中 OpenClaw Tab / 配置成功 |
| `Cherry-01-NewAPI配置页.svg` → 替换后变为 `Cherry-01-NewAPI配置页.png` | Cherry Studio NewAPI 配置页 |
| `Cherry生图-01-端点类型图像生成.svg` → 替换后变为 `Cherry生图-01-端点类型图像生成.png` | 端点类型改为图像生成 |
| `Cherry生图-02-自定义参数4K.svg` → 替换后变为 `Cherry生图-02-自定义参数4K.png` | 自定义参数 imageConfig=4K |
| `Cherry生图-03-查看图片分辨率.svg` → 替换后变为 `Cherry生图-03-查看图片分辨率.png` | 出图后查看分辨率属性 |
| `Chatbox-01-API设置页.svg` → 替换后变为 `Chatbox-01-API设置页.png` | Chatbox API 设置页 |
| `DeepChat-01-Provider配置.svg` → 替换后变为 `DeepChat-01-Provider配置.png` | DeepChat Provider 配置 |
| `ZCode-01-添加自定义提供商.svg` → 替换后变为 `ZCode-01-添加自定义提供商.png` | ZCode 添加自定义提供商（中转） |
| `ZCode-02-对话成功.svg` → 替换后变为 `ZCode-02-对话成功.png` | ZCode 对话成功 |
| `DeepSeekHarness-01-添加自定义Provider.svg` → 替换后变为 `DeepSeekHarness-01-添加自定义Provider.png` | DeepSeek Harness Models 页添加自定义 Provider |
| `DeepSeekHarness-02-对话成功.svg` → 替换后变为 `DeepSeekHarness-02-对话成功.png` | DeepSeek Harness 选用中转模型对话成功 |
| `CCSwitch-04-NewAPI令牌菜单一键配置.svg` → 替换后变为 `CCSwitch-04-NewAPI令牌菜单一键配置.png` | NewAPI 令牌管理页下拉菜单中的 CC Switch 一键配置入口 |
| `CCSwitch-05-一键导入弹窗.png` | 一键唤起后的 CC Switch 导入/配置弹窗 |

## 操作步骤

1. 打开本文件夹 `public/screenshots/`
2. 找到要换的中文文件名
3. 用同名 PNG 覆盖（例如把截图另存为 `CCSwitch-01-顶部工具Tab.png`）
4. 刷新本地预览页面

