<template>
    <div>
        <div>
            <h1>
                <el-icon>
                    <Message/>
                </el-icon>
                邮箱设置
            </h1>
            <el-form
                    :rules="rules"
                    ref="emailForm"
                    label-position="top"
                    label-width="100px"
                    :model="securityForm"
                    style="max-width: 460px"
            >
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="securityForm.email"/>
                </el-form-item>
            </el-form>
            <el-button type="success" :icon="Select" @click="saveEmail">重置邮件</el-button>
        </div>
        <el-divider/>
        <div>
            <h1>
                <el-icon>
                    <Lock/>
                </el-icon>
                密码设置
            </h1>
            <el-form
                    :rules="rules"
                    ref="passwordForm"
                    label-position="top"
                    label-width="100px"
                    :model="securityForm"
                    style="max-width: 460px"
            >
                <el-form-item label="原密码" prop="password_old">
                    <el-input show-password v-model="securityForm.password_old" />
                </el-form-item>
                <el-form-item label="新密码" prop="password_new">
                    <el-input show-password v-model="securityForm.password_new"/>
                </el-form-item>
                <el-form-item label="重复新密码" prop="password_repeat">
                    <el-input show-password v-model="securityForm.password_repeat"/>
                </el-form-item>
            </el-form>
        </div>
        <el-button type="success" :icon="Select" @click="updatePassword">修改密码</el-button>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {Message, Lock, Select,} from "@element-plus/icons-vue";
import {currentUser, get, logout, post} from "@/net";
import {ElMessage} from "element-plus";

const securityForm = reactive({
    email: null,
    password_old: '',
    password_new: '',
    password_repeat: '',
})

const validatePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== securityForm.password_new) {
        callback(new Error("两次输入的密码不一致"))
    } else {
        callback()
    }
}

const rules = {
    password_old: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 6, max: 16, message: '密码的长度必须在6-16个字符之间', trigger: ['blur', 'change']}
    ],
    password_new: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 6, max: 16, message: '密码的长度必须在6-16个字符之间', trigger: ['blur', 'change']}
    ],
    password_repeat: [
        {validator: validatePassword, trigger: ['blur', 'change']},
    ],
    email: [
        {required: true, message: '请输入邮件地址', trigger: 'blur'},
        {type: 'email', message: '请输入合法的电子邮件地址', trigger: ['blur', 'change']}
    ],
}
const emailForm = ref()
const saveEmail = () => {
    emailForm.value.validate((isValid) => {
        if (isValid) {
            post('/api/user/save-email', {
                email: securityForm.email
            }, () => {
                currentUser()
                ElMessage.success('保存成功')
            })
        } else {
            ElMessage.warning('邮件格式错误，请重新填写')
        }
    })
}
const passwordForm = ref()
const updatePassword = () => {
    passwordForm.value.validate((isValid) => {
        if (isValid) {
            post('/api/user/save-password', {
                oldPassword: securityForm.password_old,
                newPassword: securityForm.password_new,
            }, () => {
                ElMessage.success('密码修改成功，请重新登录')
                logout()
            })
        }else{
          ElMessage.warning('密码校验失败，请检查是否正确填写')
        }
    })
}
onMounted(() => {
    if (securityForm.email == null) {
        get('/api/user/get-email', message => {
            securityForm.email = message
        })
    }
})
</script>

<style scoped>

</style>