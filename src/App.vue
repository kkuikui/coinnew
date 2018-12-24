<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
@import "./styles/common.less";
body {
  /* 谷歌浏览器隐藏侧边滚动条 */
  ::-webkit-scrollbar {
    width: 0px;
    height: 1px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  // &::-webkit-scrollbar{
  //   width: 12px;
  //   background-color: #F2F2F2;
  // }
  // &::-webkit-scrollbar-thumb{
  //   border-radius: 6px;
  //   background-color: #D9D9D9;
  // }
}
</style>
