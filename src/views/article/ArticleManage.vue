<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button>添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state" placeholder="请选择" style="width: 240px">
          <el-option label="草稿文章" value="draft"></el-option>
          <el-option label="已发布文章" value="published"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" :loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="scope">
          <el-link type="primary" :underline="false">{{ scope.row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="scope">
          {{ formatTime(scope.row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="发布状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button circle type="primary" :icon="Edit" @click="onEditArticle(scope.row)"></el-button>
          <el-button circle type="danger" :icon="Delete" @click="onDeleteArticle(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end;"
    />
  </PageContainer>
</template>

<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { articleGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'

const articleList = ref([])  // 文章列表
const total = ref(0)  // 文章总数
const loading = ref(false)  // 分页加载状态

// 请求参数模型
const params = ref({
  pagenum: 1,
  pagesize: 10,
  cate_id: '',
  state: ''
})

// 请求获取文章列表方法
const getArticleList = async () => {
  loading.value = true

  const res = await articleGetListService(params.value)
  console.log(res)
  if (res.data.code !== 0) return ElMessage.error('获取文章列表失败')
  articleList.value = res.data.data
  total.value = res.data.total

  loading.value = false
}

// 搜索按钮点击事件
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
// 重置按钮点击事件
const onReset = () => {
  params.value = {
    pagenum: 1,
    pagesize: 5,
    cate_id: '',
    state: ''
  }
  getArticleList()
}
// 按键编辑文章方法
const onEditArticle = (row) => {
  console.log('编辑文章', row)
}
// 按键删除文章方法
const onDeleteArticle = (row) => {
  console.log('删除文章', row)
}

// 处理分页展示数据条数变化
const handleSizeChange = (size) => {
  // 重置当前页码为第一页
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
// 处理分页当前页码变化
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

// 页面初始化加载
getArticleList()
</script>

<style scoped>

</style>