<template>
    <div style="text-align: center;margin: 0 20px">
        <div style="margin-top: 150px" >
            <div style="font-size: 36px;font-weight: bold">
                <img src="../../assets/logo.gif" alt="logo" style="height: 50px;margin-right: 8px;"/>ニコニコ
            </div>
            <div style="font-size: 14px;color: grey">为美好的世界献上祝福(゜-゜)つロ干杯~</div>
        </div>
        <div style="margin-top: 50px">
            <el-input v-model="form.username" type="text" placeholder="用户名/邮箱">
                <template #prefix>
                    <el-icon><User /></el-icon>
                </template>
            </el-input>
            <el-input v-model="form.password" show-password type="password" style="margin-top: 10px" placeholder="密码" @blur="isFocused = false" @focus="isFocused = true">
                <template #prefix>
                    <el-icon><Lock /></el-icon>
                </template>
            </el-input>
        </div>
        <el-row style="margin-top: 5px">
            <el-col :span="12" style="text-align: left">
                <el-checkbox v-model="form.remember" label="记住我"/>
            </el-col>
            <el-col :span="12" style="text-align: right">
                <el-link @click="router.push('/forget')">忘记密码？</el-link>
            </el-col>
        </el-row>
        <div style="margin-top: 40px">
            <el-button @click="login()" style="width: 270px" type="success" plain>立即登录</el-button>
        </div>
        <el-divider>
            <span style="color: grey;font-size: 13px">没有账号</span>
        </el-divider>
        <div>
            <el-button style="width: 270px" @click="router.push('/register')" type="warning" plain>注册账号</el-button>
        </div>
        <div class="welcome-icon">
            <el-image :src="iconSrc"></el-image>
        </div>
    </div>
</template>

<script setup>
import {User, Lock} from '@element-plus/icons-vue'
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import {currentUser, get, post} from "@/net";
import router from "@/router";
import {useStore} from "@/stores";
import { ref, computed } from 'vue';
import axios from "axios";

const store = useStore()

const form = reactive({
    username: '',
    password: '',
    remember: false
})
const isFocused = ref(false);
const login = () => {
    if(!form.username || !form.password) {
        ElMessage.warning('请填写用户名和密码！')
    } else {
        post('/api/auth/login', {
            username: form.username,
            password: form.password,
            remember: form.remember
        }, (message) => {
            ElMessage.success(message)
            currentUser(true)
        })
    }
}
const iconSrc = computed(() => {
    return isFocused.value
        ? 'https://s2.loli.net/2023/07/17/R3YxaTlVqX9uwpo.png'
        : 'https://s2.loli.net/2023/07/17/TVk7Ev8Ow4hIZ5c.png';
});
</script>

<style scoped>
.welcome-icon {
    position: absolute;
    width: 7rem;
    bottom: 0;
    right: 0;
}
</style>