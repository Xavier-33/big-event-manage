<template>
  <el-drawer v-model="visibleDrawer" >
    <template #title>
      <span>添加文章</span>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'

const visibleDrawer = ref(false)

const open = (row) => {
  visibleDrawer.value = true
  console.log(row)
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped>
</style>
