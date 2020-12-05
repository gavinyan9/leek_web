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
      <el-table-column prop="name" label="name" width="120" />
      <el-table-column prop="occupation" label="occupation" width="300" />
      <el-table-column prop="hold" label="INSTO" width="120" />
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'StUser',
  data() {
    return {
      tableData: [{
        name: 'Leek Ge',
        occupation: 'Chief Executive Officer / CTO',
        hold: '78'
      }, {
        name: 'Hy Lee',
        occupation: 'Chief Chairman / Chief Financial Officer',
        hold: '12'
      }, {
        name: 'Old Mom',
        occupation: 'Chief Supervisor',
        hold: '10'
      }]
    }
  },
  mounted() {

  },
  methods: {}
}
</script>
