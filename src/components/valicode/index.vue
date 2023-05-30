<template>
  <div class="captcha" style="display: flex">
    <canvas ref="canvas" width="100" height="40" @click="refresh"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const emits = defineEmits(['getCode']);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | any>(null);
const code = ref('');
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charLength = chars.length;

const getRandomChar = () => {
  return chars.charAt(Math.floor(Math.random() * charLength));
};

const draw = () => {
  if (!ctx.value) return;
  ctx.value.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height);
  let x = 10;
  for (let i = 0; i < 4; i++) {
    const c = getRandomChar();
    code.value += c;
    ctx.value.font = 'bold 20px Arial';
    ctx.value.fillStyle = randomColor(0, 255);
    ctx.value.fillText(c, x, 25);
    x += 20;
  }
  for (let i = 0; i < 10; i++) {
    ctx.value.strokeStyle = randomColor(0, 255);
    ctx.value.beginPath();
    ctx.value.moveTo(Math.random() * 100, Math.random() * 40);
    ctx.value.lineTo(Math.random() * 100, Math.random() * 40);
    ctx.value.stroke();
  }
  emits('getCode', code.value);
};

// 生成一个随机数
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// 生成一个随机的颜色
const randomColor = (min: number, max: number) => {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};

const refresh = () => {
  code.value = '';
  draw();
  emits('getCode', code.value);
};

// 子组件导出需要在父组件中调用的方法
defineExpose({
  refresh
})

onMounted(() => {
  const code = ref('');
  canvasRef.value = document.querySelector('canvas');
  emits('getCode', code.value);
  ctx.value = canvasRef.value?.getContext('2d');
  draw();
});
</script>

<style scoped>
.captcha {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 30px;
}
</style>
