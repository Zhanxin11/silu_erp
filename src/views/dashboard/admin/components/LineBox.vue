<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :lg="6" class="card-panel-col">
        <div class="line-box chart-wrapper">
          <!-- <area-chart></area-chart> -->
        </div>
      </el-col>
      <el-col :lg="6" class="card-panel-col">
        <div class="line-box chart-wrapper" />
      </el-col>
      <el-col :lg="6" class="card-panel-col">
        <div class="line-box chart-wrapper" />
      </el-col>
      <el-col :lg="6" class="card-panel-col">
        <div class="line-box chart-wrapper" />
      </el-col>
    </el-row>
    <el-row :gutter="40" class="panel-group">
      <el-col :lg="6" class="card-panel-col">
        <div class="card-panel chart-wrapper" />
      </el-col>
      <el-col :lg="6" class="card-panel-col">
        <div class="card-panel chart-wrapper" />
      </el-col>
      <el-col :lg="6" class="card-panel-col">
        <div class="card-panel chart-wrapper" />
      </el-col>
      <el-col :lg="6" class="card-panel-col">
        <div class="card-panel chart-wrapper" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AreaChart from './AreaChart'
export default {
  components: { AreaChart },
  props: {},
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {}
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 150px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(152, 61, 61, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
  .line-box {
    height: 120px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(152, 61, 61, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

