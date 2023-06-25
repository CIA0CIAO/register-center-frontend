<template>
    <div style="display: flex;padding: 20px 30px">
        <div style="flex:1">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="个人信息设置" name="info" >
                    <info-settings/>
                </el-tab-pane>
                <el-tab-pane label="账号安全设置" name="security">
                    <security-settings/>
                </el-tab-pane>
                <el-tab-pane label="隐私设置" name="privacy">
                    <privacy-settings/>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div style="width: 300px;">
            <div class="user-card" style="margin: 35px 0 0 30px">
                <div style="text-align: right;padding: 5px 15px 0 15px">
                    <el-avatar :size="70"
                               src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <div style="font-weight: bold">{{ store.auth.user?.username }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useStore} from "@/stores";
import InfoSettings from "@/components/settings/InfoSettings.vue";
import SecuritySettings from "@/components/settings/SecuritySettings.vue";
import PrivacySettings from "@/components/settings/PrivacySettings.vue";
import {ref} from "vue";

const store = useStore()
const activeTab = ref('info')
</script>

<style scoped>
.user-card {
    height: 300px;
    width: 260px;
    border-radius: 5px;
    border: 1px solid lightgrey;
}

.user-card > div {
    border-bottom: solid 1px #d3d3d3;
}
</style>