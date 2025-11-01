<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button>添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row 是 channelList 中的每一项, $index 是当前项的索引 -->
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit" 
            circle
            plain
            type="primary"
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column> 
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
  </PageContainer>
</template>

<script setup>
import { articleGetChannelService } from '@/api/article.js'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

const channelList = ref([])  // 文章分类列表
const loading = ref(false)


// 静态数据
const staticChannelList = [
  { id: 44133, cate_name: '新闻', cate_alias: 'news' },
  { id: 44134, cate_name: '热点', cate_alias: 'hot' },
  { id: 44135, cate_name: '程序员', cate_alias: 'worker' },
  { id: 44136, cate_name: '美女', cate_alias: 'girl' },
  { id: 44137, cate_name: '帅哥', cate_alias: 'boy' },
  { id: 44138, cate_name: '社会', cate_alias: 'social' },
  { id: 44139, cate_name: '政治', cate_alias: 'political' },
  { id: 44140, cate_name: '文化', cate_alias: 'culture' }
]

// 获取文章分类列表
const getChannelList = async () => {
  loading.value = true
  const res = await articleGetChannelService()
  if (res.code === 200) {
    channelList.value = res.data.data
    console.log('my_cate_list api success')
  } else {
    // 文章分类 GET 接口失效，用静态数据代替显示
    channelList.value = staticChannelList
    console.log('my_cate_list api invalid')
  }
  loading.value = false
}


const onEditChannel = (row, $index) => {
  console.log(row, $index)
}
const onDeleteChannel = (row, $index) => {
  console.log(row, $index)
}

getChannelList()
</script>

<style lang="scss" scoped></style>