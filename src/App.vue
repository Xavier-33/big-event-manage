<template>
  <div>这是文件首页</div>
  <button @click="goList" type="primary">跳转list页面</button>
  <button @click="$router.push('/node')" type="success">跳转home页面</button>
  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('login')">登录</el-button>
  <el-button @click="userStore.removeToken()">退出</el-button>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()

const goList = () => {
  router.push({
    path: '/list'
  })
  console.log(route.query)
  console.log(router)
}

const userStore = useUserStore()



</script>

<style scoped></style>
