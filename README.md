# Chao Li — Academic Homepage

这是 [chaobiubiu.github.io](https://chaobiubiu.github.io/) 的静态主页源码。页面采用轻量、响应式的学术主页设计，不依赖前端框架，可直接由 GitHub Pages 托管。

## 页面结构

- `index.md`：主页内容源文件，包含 Short Bio、News、Research Interests、Teaching、Students。
- `publications.html`：独立的 Publications 页面。
- `builder/template.html`：主页 HTML 模板与顶部导航。
- `assets/styles/site.css`：全站样式。
- `assets/scripts/site.js`：移动端菜单与主页导航高亮。
- `build.js`：将 `index.md` 生成 `index.html`，同时生成 `404.html`。

## 本地构建

```bash
node build.js
```

Windows 也可以直接运行：

```bat
build.bat
```

构建完成后，可在项目目录启动任意静态文件服务器进行预览，例如：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000/`。

## 内容维护

1. 修改主页各章节内容时，编辑 `index.md`。各章节开头均有 `<!-- ===== ... ===== -->` 注释用于定位。
2. 修改完整论文列表时，编辑 `publications.html` 中对应的 Preprints、Conference 或 Journal 区域。
3. 修改顶部导航和全站页脚时，编辑 `builder/template.html`。
4. 修改字号、颜色、间距和照片尺寸时，编辑 `assets/styles/site.css`。
5. 修改 `index.md` 或模板后运行 `node build.js`，不要直接维护自动生成的 `index.html`。
6. 每次推送到远端 `main` 分支后，GitHub Pages 会从仓库根目录发布更新。

## GitHub 连接

本地仓库远端地址：

```text
https://github.com/chaobiubiu/chaobiubiu.github.io.git
```

站点地址：

```text
https://chaobiubiu.github.io/
```
