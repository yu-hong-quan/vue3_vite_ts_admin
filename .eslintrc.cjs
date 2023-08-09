module.exports = {
    // 运行环境
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    // 规则继承
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended",
        // 接入 prettier 的规则
        "prettier",
        "plugin:prettier/recommended"
    ],
    // 要为特定类型的文件指定处理器
    "overrides": [
    ],
    // 指定解释器
    "parser": "@typescript-eslint/parser",
    // 指定解释器选项
    "parserOptions": {
        "ecmaVersion": "latest",//校验ECMA最新版本
        "sourceType": "module"
    },
    // 第三方插件
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    // eslint规则配置
    "rules": {
        "allowSyntheticDefaultImports": "off",
        /*
        * 'off' 或0 ==> 关闭规则
        * 'warn' 或1 ==> 打开的规则作为警告(不影响代码执行)
        * 'error' 或2 ==> 规则作为一个错误(代码不能执行，界面报错)
        */
        'no-var': 'error', //要求使用let.或:const 而不是var
        'no-multiple-empty-lines': ['warn', { max: 1 }], //不允许多个空行
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unexpected-multiline': 'error', //禁止空余的多行
        'no-useless-escape': 'off', //禁止不必 要的转义字符

        // typeScript (https ://typescript -eslint . io/rules)
        '@typescript-eslint/no-unused-vars': 'warn', //禁止定义未使用的变量
        '@typescript-eslint/prefer-ts-expect-error': 'error', //禁止使用 @ts-ignore
        '@typescript-eslint/no-explicit-any': 'off', //禁止使用any类型
        '@typescript-eslint/ no-non-null-assertion': 'off',
        '@typescript-eslint/no namespace': 'off', //禁止使用自定义TypeScript 模块和命名空间
        '@typescript-eslint/semi': 'off',

        // eslint-plugin-vue (https://eslint. vuejs.org/rules/ )
        'vue/multi-word-component-names': 'off', //要求组件名称始终为 “_” 链接的单词
        'vue/script-setup-uses-vars': 'error', //防止<script setup>使用的变量<template>被标记为未使用
        'vue/no-mutating-props': 'off', //不允许组件prop的改变 
        'vue/attribute-hyphenation': 'off', //对模板中的自定义组件强制执行属性命名样式

        // 开启 prettier 自动修复的功能
        "prettier/prettier": "error",

    }
}
