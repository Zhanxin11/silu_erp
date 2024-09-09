<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-08-23 14:58:21
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-27 09:52:24
 * @FilePath: \vue-element-admin\src\views\dashboard\datav.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <dv-full-screen-container class="father-box">
      <dv-border-box-11 title="近期数据">
        <div>
          <dv-border-box-6></dv-border-box-6>
        </div>
      </dv-border-box-11>
    </dv-full-screen-container>
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
  /* 1894，1693 */
  @data-width: 1693px;

  .app-container {
    background-color: black;
    height: 90.9vh;
  }

  #dv-full-screen-container {
    position: relative;
    width: 1825px !important;


    height: 800px !important;
  }


  .dv-border-box-6 {
    position: relative;
    height: 200px !important;

    width: 300px !important;
    top: 50px;
    left: 30px;
    background-color: rgb(215, 226, 222);
  }
</style>