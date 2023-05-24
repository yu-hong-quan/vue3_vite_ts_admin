module.exports = {
    singleQuote: true,//使用单引号
    semi: true,//句末使用分号
    eslintIntegration: true,
    bracketSpacing: true,
    htmlWhitespaceSensitivity: "ignore",
    endOfLine: "auto",
    trailingComma: "all",
    tabWidth: 2,//缩进长度
    overrides: [
        {
            files: '*.svelte',
            options: { parser: 'svelte' },
        }
    ]
}