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
    background-color: aquamarine;
  }
</style>