import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
// @ts-ignore
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// mock插件提供的方法
import { viteMockServe } from 'vite-plugin-mock';

import DefineOptions from 'unplugin-vue-define-options/vite';

export default defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd());//loadEnv：vite自带的方法，返回当前环境下的配置信息    mode：当前环境   process.cwd()：根目录路径
  return {
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 请求的服务器地址
          target: env.VITE_SERVE,
          // 是否开启跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        // 配置路径在你的src里的svg存放文件
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve', //保证开发阶段可以使用mock接口
      }),
      DefineOptions(),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), //相对路径别名配置,使用 @ 代替 src
      },
    },
    // scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  };
});
