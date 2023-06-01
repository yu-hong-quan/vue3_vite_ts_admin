// 创建layout组件相关的小仓库
import { defineStore } from 'pinia';

let useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false,//用于判断菜单折叠还是展开
            refsh: false,//用于控制刷新效果
        }
    }
})


export default useLayOutSettingStore;