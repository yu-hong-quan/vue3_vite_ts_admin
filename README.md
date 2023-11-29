# 技术栈及插件

Vue3、TypeScript、Vite、Eslint、Prettier、StyleLintrc、Husky、CommitLint、Element-Plus、Mock、Axios、vue-router、Pinia、Nprogress

### Eslint ：代码及修复命令

检查命令: pnpm/npm run lint
修复命令: pnpm/npm run fix

---

### Prettier ：代码格式化（项目中已配置了 ctrl+s 保存自动格式化）

格式化命令：pnpm/npm run format

---

### StyleLintrc ：CSS 规范校验工具

---

### Husky ：将提交的代码进行一次格式化操作，防止有代码提交时没有格式化

安装：pnpm/npm i -D husky

---

### CommitLint ：统一 Git Commit 提交时的填写描述格式

安装：pnpm/npm add @commitlint/config-conventional @commitlint/cli -D

'feat: ',//新特性、新功能
'fix: ',//修改 bug
'docs: '//文档修改
'style: ',//代码格式修改，注意不是 css 修改
'refactor: ',//代码重构
'perf: ',//优化相关，比如提升性能、体验
'test: ',//测试用例修改
'chore: ',//其他修改，比如改变构建流程、或者增加依赖库、工具等
'revert: ',//回滚到上一个版本
'build: ',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动

---

### Preinstall ：统一包管理工具

团队开发项目的时候，需要统一包管理器工具，因为不同包管理器工具下载同一个依赖，可能版本不一样，导致项目出现 bug 问题,因此包管理器工具需要统一管理!!!

---

### SVG 图标封装

安装：pnpm/npm i vite-plugin-svg-icons -D

---

### 封装自定义插件注册全局组件

---

### scss 全局变量配置

---

### Mock：数据模拟

安装：pnpm install -D vite-plugin-mock@2.9.6 mockjs

---

### Axios：网络请求插件

---

### Pinia：状态管理器

---

## Nprogress：进度条插件

---

## autofit.JS：可视化大屏自适应插件(支持)  

仓库地址：https://github.com/LarryZhu-dev/autofit.js
安装：npm i autofit.js 

---

## DataV：大屏可视化UI组件

安装：pnpm i @dataview/datav-vue3
温馨提示：Vue3安装dataV报错问题解决方案
    1.忽略声明警告
        文件：/src/shims-vue.d.ts
            新增：declare module '@dataview/datav-vue3';
    2.dataV配置文件修改
        文件：node_modules/@dataview/datav-vue3/package.json
           修改：修改前 "module": "./es/index.js",
                 修改后 "module": "./es/index.mjs",
---


