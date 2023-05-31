import SvgIcon from '@/components/SvgIcon/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 全局对象
const allGloablComponent = {
  SvgIcon,
};

// 对外暴露自定义插件对象
export default {
  install(app: any) {
    // 注册项目全部全局组件
    Object.keys(allGloablComponent).forEach((key) => {
      app.component(key);
    });

    // 将element-plus提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
