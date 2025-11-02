<template>
  <el-select v-model="modelValue" placeholder="请选择" style="width: 240px">
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script setup>
import { ref } from 'vue'
import { articleGetChannelService } from '@/api/article'

const modelValue = defineModel()

const channelList = ref([])
const getChannelList = async () => {
  const res = await articleGetChannelService()
  if (res.status !== 200) return ElMessage.error('获取文章分类失败')
  channelList.value = res.data.data
}

getChannelList()
</script>

<style lang="scss" scoped>
</style>
