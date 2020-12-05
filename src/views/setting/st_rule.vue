<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column align="center" label="number" width="80">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="rule" label="rule" />
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'StUser',
  data() {
    return {
      tableData: [{
        rule: '不追高杀跌'
      }, {
        rule: '家有余粮，心里不慌'
      }]
    }
  },
  mounted() {

  },
  methods: {}
}
</script>
