<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 8px;">
      <el-input v-model="listQuery.my_date" placeholder="created_at" style="width: 160px;" class="filter-item" />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 8px;"
        @click="handleFilter"
      >
        Search
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        Add
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
      <el-table-column align="center" prop="createdAt" label="created_at" width="160" />
      <el-table-column label="diary" prop="text" />
      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editDiary(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="formData"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Diary">
          <el-input v-model="formData.text" type="textarea" placeholder="Please input" :rows="6" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="createData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { createDiary, getDiaryList } from '@/api/habit'
import Pagination from '@/components/Pagination'

export default {
  name: 'Diary',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        my_date: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      formData: {
        md_code: '',
        text: ''
      },
      dialogPvVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = false
      getDiaryList(this.listQuery).then(response => {
        this.list = response.data.result
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {

    },
    editDiary(row) {
      this.dialogStatus = 'Edit'
      this.formData.md_code = row.mdCode
      this.formData.text = row.text
      this.dialogFormVisible = true
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      createDiary(this.formData).then(() => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 10000
        })
        this.fetchData()
      })
    }
  }
}
</script>
