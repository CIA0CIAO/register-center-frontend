<template>
    <div>
        <el-form
                label-position="top"
                label-width="100px"
                :model="privacyForm"
                style="max-width: 460px"
        >
            <el-form-item>
                <el-checkbox v-model="privacyForm.email" label="是否公开展示我的邮箱" size="large"/>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="privacyForm.sex" label="是否公开展示我的性别" size="large"/>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="privacyForm.qq" label="是否公开展示我的QQ" size="large"/>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="privacyForm.wechat" label="是否公开展示我的微信" size="large"/>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="privacyForm.blog" label="是否公开展示我的博客" size="large"/>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="privacyForm.phone" label="是否公开展示我的联系电话" size="large"/>
            </el-form-item>
        </el-form>
        <el-button type="success" :icon="Select" style="margin-top: 15px" @click="savePrivacy">保存隐私设置</el-button>
    </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {Select} from "@element-plus/icons-vue";
import {get, post} from "@/net";
import {ElMessage} from "element-plus";

const privacyForm = reactive({
    email: false,
    qq: false,
    wechat: false,
    phone: false,
    blog: false,
    sex: false,
})
const savePrivacy = () => {
    post('/api/user/save-privacy', privacyForm, () => {
        ElMessage.success('保存成功')
    }, 'json')
}
onMounted (() => {
    get('/api/user/get-privacy', message => {
        privacyForm.email = message.email
        privacyForm.qq = message.qq
        privacyForm.wechat = message.wechat
        privacyForm.phone = message.phone
        privacyForm.blog = message.blog
        privacyForm.sex = message.sex
    })
})
</script>

<style scoped>
::v-deep(.el-form-item) {
    margin-bottom: 5px;
}
</style>