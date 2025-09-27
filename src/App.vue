<template>
  <hr />
  <router-view></router-view>
  <hr />
  <hr />
  <hr />
  <div>这是文件首页</div>
  <button @click="goList" type="primary">跳转list页面</button>
  <button @click="$router.push('/node')" type="success">跳转home页面</button>
  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('login')">登录</el-button>
  <el-button @click="userStore.removeToken()">退出</el-button>
  <hr />
  {{ countStore.count }}
  <el-button @click="countStore.add(1)">+1</el-button>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserStore, useCounterStore } from '@/stores'

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
const countStore = useCounterStore()

// 测试请求拦截器和响应拦截器


</script>

<style scoped></style>
