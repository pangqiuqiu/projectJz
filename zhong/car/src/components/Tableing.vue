<template>
<!-- JS1 -->
  <el-table border :data="listData" style="width: 100%" :header-cell-style="{'text-align': 'center'}" :cell-style="cellStyle" fit>
    <el-table-column v-for="(item, index) in listLabel" :key="index" :prop="item.prop" :label="item.label"></el-table-column>
    <!-- JS2 -->
    <template>
      <div>
        <el-table border :data="listData" style="width: 100%" :header-cell-style="{'text-align': 'center'}" fit>
          <el-table-column v-for="(item, index) in headData" :key="index" :property="item.property" :label="item.label"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </template>
  </el-table>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default: () => {
        return []
      }
    },
    listLabel: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    cellStyle () {
    }
  }
}
</script>

<script>
export default {
  data () {
    return {
      headData: [
        {
          label: '标题',
          property: 'prop'
        }, {
          label: '作者',
          property: 'label'
        }
      ],
      listData: [
        {
          prop: '2016-05-02',
          label: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          prop: '2016-05-04',
          label: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          prop: '2016-05-01',
          label: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          prop: '2016-05-03',
          label: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  created () {
    for (var k in this.listData[0]) {
      console.log(k)
    }
  }
}
</script>

<style lang="less" scoped>
</style>

