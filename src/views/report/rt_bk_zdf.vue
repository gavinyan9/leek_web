<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 6px;" />
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="板块" prop="bk_name" width="90" />
      <el-table-column label="总数" align="center" prop="bk_zs" width="90" sortable />
      <el-table-column label="上涨数" align="center" prop="bk_zf" width="100" sortable />
      <el-table-column label="下跌数" align="center" prop="bk_df" width="100" sortable />
      <el-table-column label="比例" align="center" prop="bk_bl" width="90" sortable />
      <el-table-column label="成交额" align="center" prop="bk_cje" width="100" sortable />
    </el-table>
  </div>
</template>

<script>
import { getBkZdfInfo } from '@/api/report'

export default {
  name: 'RtBkZdf',
  data() {
    return {
      list: null,
      listLoading: false,
      dialogPvVisible: false
    }
  }, created() {
    this.fetchData()
  }, methods: {
    fetchData() {
      this.listLoading = false
      getBkZdfInfo().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
