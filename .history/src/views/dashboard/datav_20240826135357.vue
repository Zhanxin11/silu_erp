

<template>
  <div class="app-container">
    <dv-full-screen-container class="father-box">
      <dv-border-box-11 title="近期数据">
        <div class="left">
  <dv-boder
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
    height: 90vh;
  }

  #dv-full-screen-container {
    position: relative;
    width: 1825px !important;
    /* height: 600px !important; */
  }
</style>
