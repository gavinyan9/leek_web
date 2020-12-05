<template>
  <div class="app-container">
    <div class="filter-container">
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
      :data="list"
      element-loading-text="Loading"
      row-key="plan_code"
      border
      fit
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column align="center" prop="created_at" label="代码" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.plan_code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划项" width="300">
        <template slot-scope="scope">
          {{ scope.row.plans }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="85" align="center">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.plan_status | statusFilter">{{ scope.row.plan_status==='1'?'working':'waiting' }}</el-tag>-->
          <el-tag v-if="scope.row.plan_status=='0'" type="info">waiting</el-tag>
          <el-tag v-if="scope.row.plan_status=='1'">working</el-tag>
          <el-tag v-if="scope.row.plan_status=='2'" type="success">finished</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="周期(天)" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.yj_day }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="优先级" width="80">
        <template slot-scope="scope">
          <el-link v-if="scope.row.plan_level=='1'" type="success">优先</el-link>
          <el-link v-if="scope.row.plan_level=='3'" type="primary">来日方长</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开始日期" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.start_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Diary">
          <el-input
            v-model="temp.plans"
            :autosize="{ minRows: 2, maxRows: 8}"
            type="textarea"
            placeholder="Please input"
            style="width: 300px;"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { createDiary, getPlanList } from '@/api/habit'

export default {
  name: 'LfPlans',
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'gray',
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      temp: {
        plans: ''
      },
      statusOptions: ['published', 'draft', 'deleted'],
      dialogPvVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = false
      getPlanList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      createDiary(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 20000
        })
        this.fetchData()
      })
    }
  }
}
</script>
