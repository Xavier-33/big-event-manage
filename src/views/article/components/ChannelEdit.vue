<template>
  <el-dialog 
    v-model="dialogVisible" 
    :title="formModel.id ? '编辑分类' : '添加分类'" 
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formModel" 
      :rules="rules" 
      label-width="100px" 
      style="padding-right: 30px;"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" placeholder="请输入分类别名"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { articleAddChannelService, articleEditChannelService } from '@/api/article.js'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)  // 是否显示dialog
const formRef = ref(null)  // 表单实例

// 表单数据模型
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

// 表单验证规则
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, 
      message: '分类名称长度必须是 1-10 位的非空字符', 
      trigger: 'blur' 
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,15}$/, 
      message: '分类别名长度必须是 1-15 位的字母或数字', 
      trigger: 'blur' 
    }
  ]
}

// 区分是编辑还是添加
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}

const emit = defineEmits(['success'])
const onSubmit = async () => {
  // 校验表单
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    // 编辑
    await articleEditChannelService(formModel.value)
    ElMessage.success('编辑分类成功')
  } else {
    // 添加
    await articleAddChannelService(formModel.value)
    ElMessage.success('添加分类成功')
  }
  // 关闭弹层
  dialogVisible.value = false
  // 通知父组件回显
  emit('success')
}

// 向外暴露方法
defineExpose({
  open
})

</script>

<style scoped>

</style>