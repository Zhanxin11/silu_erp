<!--
 * @Author: zhanxin11 749959696@qq.com
 * @Date: 2024-08-24 13:04:27
 * @LastEditors: zhanxin11 749959696@qq.com
 * @LastEditTime: 2024-08-24 17:30:49
 * @FilePath: \vue-element-admin\src\views\dashboard\datav.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!--  我是大屏-->
  <dv-full-screen-container style="background-color: black">

    <div class="module-box">
      <div style="flex: 0 1 30%">
        <div class="flex flex-direction">
          <dv-border-box-5 style="height: 20vh;">dv-border-box-8</dv-border-box-5>
          <dv-border-box-6 style="height: 20vh;">dv-border-box-8</dv-border-box-6>
          <dv-border-box-11 style="height: 20vh;">dv-border-box-8</dv-border-box-11>
        </div>
      </div>
      <div style="flex: 0 1 40%">
        <dv-border-box-11 style="height: 60vh;width: 100%" title="dv-border-box-11">
        </dv-border-box-11>
      </div>
      <div style="flex: 0 1 30%">
        <div class="flex flex-direction"></div>
        <dv-border-box-11 style="height: 30vh;" title="dv-border-box-11">
        </dv-border-box-11>
        <dv-border-box-11 style="height: 30vh;" title="dv-border-box-11"></dv-border-box-11>
      </div>
    </div>
    <div class="module-box">
      <div style="flex: 0 1 50%">
        <dv-border-box-11 style="height: 38vh;" title="dv-border-box-11">
        </dv-border-box-11>
      </div>
      <div style="flex: 0 1 50%">
        <dv-border-box-11 style="height: 38vh;" title="dv-border-box-11"></dv-border-box-11>
      </div>
    </div>
  </dv-full-screen-container>

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
