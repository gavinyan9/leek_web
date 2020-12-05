<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 6px;">
      <el-button class="filter-item" style="margin-left: 8px;" type="primary" @click="syncData">
        Sync
      </el-button>
      <el-button class="filter-item" style="margin-left: 8px;" type="primary" @click="loadRealData">
        Load
      </el-button>
      <el-button class="filter-item" style="margin-left: 8px;" type="primary" @click="clearRealFunc">
        Clear
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
      <el-table-column label="板块" prop="bk_name" width="92" />
      <el-table-column label="现价" prop="sk_xj" width="76" />
      <el-table-column label="1D" align="center" prop="sk_zdf" width="60" />
      <el-table-column label="市值(亿)" align="center" width="80" prop="sk_ltsz" />
      <el-table-column label="评分" align="center" prop="sk_score" width="66" />
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="techDelFunc(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { clearReal, loadReal, syncRealData, techDel, techList } from '@/api/stock'

export default {
  name: 'SkReal',
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    techDelFunc(row) {
      techDel({ sk_code: row.sk_code }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Deleted Successfully',
          type: 'success',
          duration: 3000
        })
        this.fetchData()
      })
    },
    fetchData() {
      this.listLoading = false
      techList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    loadRealData() {
      loadReal().then(() => {
        this.$notify({
          title: 'Success',
          message: 'Load Successfully',
          type: 'success',
          duration: 6000
        })
        this.fetchData()
      })
    },
    goDetail(row) {
      window.open('http://stockpage.10jqka.com.cn/' + row.sk_code)
    },
    clearRealFunc() {
      clearReal().then(() => {
        this.$notify({
          title: 'Success',
          message: 'Deleted Successfully',
          type: 'success',
          duration: 3000
        })
        this.fetchData()
      })
    },
    syncData() {
      syncRealData({ param: 'real' }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 6000
        })
        this.fetchData()
      })
    }
  }
}
</script>
