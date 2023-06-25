<template>
    <div>
        <el-form
                ref="formRef"
                :rules="rules"
                label-position="top"
                label-width="100px"
                :model="infoForm"
                style="max-width: 460px"
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="infoForm.username" :maxlength="11"/>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="infoForm.sex" class="ml-4">
                    <el-radio label="male" size="large">男</el-radio>
                    <el-radio label="female" size="large">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="QQ" prop="qq">
                <el-input v-model="infoForm.qq" :maxlength="11"/>
            </el-form-item>
            <el-form-item label="WeChat" prop="wechat">
                <el-input v-model="infoForm.wechat" :maxlength="30"/>
            </el-form-item>
            <el-form-item label="博客" prop="blog">
                <el-input v-model="infoForm.blog" :maxlength="50"/>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
                <el-input v-model="infoForm.phone" :maxlength="11"/>
            </el-form-item>
            <el-form-item label="个人简介" prop="desc">
                <el-input type="textarea" v-model="infoForm.desc" :rows="6" :maxlength="500"/>
            </el-form-item>
        </el-form>
        <el-button type="success" :icon="Select" @click="save">保存个人信息设置</el-button>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {Select} from "@element-plus/icons-vue";
import {currentUser, get, post} from "@/net";
import {ElMessage} from "element-plus";

const infoForm = reactive({
    username: null,
    desc: '',
    qq: '',
    wechat: '',
    phone: '',
    blog: '',
    sex: '',
})
const validateUsername = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else if(!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)){
        callback(new Error('用户名不能包含特殊字符，只能是中文或英文'))
    } else {
        callback()
    }
}
const validatePhone = (rule, value, callback) => {
    if(!/^1[3-9]\d{9}$/.test(value)){
        callback(new Error('手机号格式错误'))
    } else {
        callback()
    }
}
const validateBlog = (rule, value, callback) => {
    if( !/^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+(\/[a-zA-Z0-9-_.?=/]*)?$/.test(value)){
        callback(new Error('博客地址格式错误'))
    } else {
        callback()
    }
}
const rules = {
    username: [
        { validator: validateUsername, trigger: ['blur', 'change'] },
        { min: 2, max: 11, message: '用户名的长度必须在2-8个字符之间', trigger: ['blur', 'change'] },
    ],
    phone: [
        { validator: validatePhone, trigger: ['blur', 'change'] },
        { min: 11, max: 11, message: '仅支持中国大陆11位手机号', trigger: ['blur', 'change'] },
    ],
    qq: [
        { min: 8, max: 11, message: '长度必须在8-11位之间', trigger: ['blur', 'change'] },
    ],
    wechat: [
        { min: 5, max: 30, message: '长度必须在5-30位之间', trigger: ['blur', 'change'] },
    ],
    blog: [
        { validator: validateBlog, trigger: ['blur', 'change'] },
        { max: 50, message: '博客链接过长', trigger: ['blur', 'change'] },
    ],
    desc: [
        {  max: 500,message: '字数要求小于500字', trigger: ['blur', 'change'] },
    ]
}
const formRef = ref()
const save = () => {
    formRef.value.validate((isValid) => {
        if(isValid){
            post("/api/user/save-info", infoForm,()=>{
                currentUser()
                ElMessage.success('保存成功')
            },'json')
        }else{
          ElMessage.warning('表单内容有误，请重新填写')
        }
    })
}

onMounted(() => {
    if(infoForm.username == null){
        get('/api/user/get-info', (message)=>{
            infoForm.username = message.username
            infoForm.desc = message.desc
            infoForm.qq = message.qq
            infoForm.wechat = message.wechat
            infoForm.phone = message.phone
            infoForm.blog = message.blog
            infoForm.sex = message.sex ? message.sex:'male'
        })
    }

})
</script>

<style scoped>

</style>