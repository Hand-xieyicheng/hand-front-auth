<template>
    <router-view />
</template>

<script setup>
</script>

<style scoped>
@font-face {
  font-family: 'dingliexidafont'; /* 字体家族名称（自定义） */
  src: url('./assets/fonts/dingliexidafont.ttf') format('truetype'); /* 优先加载 woff2 */
  font-weight: 400; /* 字体粗细，如 400（正常）、700（加粗） */
  font-style: normal; /* 字体样式，如 normal、italic */
}
@font-face {
  font-family: 'ZenMaruGothic';
  src: url('./assets/fonts/ZenMaruGothic-Regular.ttf');
  font-weight: 400; /* Regular 对应 400，也可写 normal */
  font-style: normal;
}

@font-face {
  font-family: 'ZenMaruGothic';
  src: url('./assets/fonts/ZenMaruGothic-Bold.ttf');
  font-weight: 700; /* Bold 对应 700，也可写 bold */
  font-style: normal;
}

* {
  font-family: 'ZenMaruGothic', sans-serif;
}
</style>