<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-08-24 13:04:27
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-24 13:04:27
 * @FilePath: \vue-element-admin\src\views\dashboard\datav.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
      <dv-border-box-11 title="近期数据">dv-border-box-11</dv-border-box-11>
  </div>
</template>

<script>
  import *as echarts from 'echarts'
  export default {
    components: {},
    props: {},
    data() {
      return {
      }
    },
    watch: {},
    computed: {},
    methods: {},
    created() { },
    mounted() { }
  };
</script>
<style lang="scss" scoped>
  .app-container {
    background-color: black;
    height: 90vh;
  }
</style>
