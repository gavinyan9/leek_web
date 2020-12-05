<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 6px;">
      <el-button class="filter-item" style="margin-left: 8px;" type="primary" icon="el-icon-edit" @click="syncData">
        Sync
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="56">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="代码" prop="sk_code" width="68" />
      <el-table-column label="名称" prop="sk_name" width="80" />
      <el-table-column label="板块" prop="bk_name" width="80" />
      <el-table-column label="现价" prop="sk_xj" width="80" />
      <el-table-column label="±(1)" align="center" prop="sk_zdf" width="66" />
      <el-table-column label="±(10)" align="center" width="78" prop="sk_last10" />
      <el-table-column label="2020" align="center" width="70" prop="year1" />
      <el-table-column label="2019" align="center" width="70" prop="year2" />
      <el-table-column label="2018" align="center" width="70" prop="year3" />
      <el-table-column label="市值(亿)" align="center" width="88" prop="sk_ltsz" />
      <el-table-column label="评分" align="center" prop="sk_score" width="50" />
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="delSkWatchFunc(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { delSkWatch, skWatchList, syncRealData } from '@/api/stock'

export default {
  name: 'SkWatch',
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
      skWatchList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    syncData() {
      syncRealData({ param: 'collect' }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 6000
        })
        this.fetchData()
      })
    },
    delSkWatchFunc(row) {
      delSkWatch({ sk_code: row.sk_code }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Deleted Successfully',
          type: 'success',
          duration: 6000
        })
        this.fetchData()
      })
    },
    goDetail(row) {
      window.open('http://stockpage.10jqka.com.cn/' + row.sk_code)
    }
  }
}
</script>
