<template>
    <div style="height: 100vh">
        <el-container style="height: 100%">
            <el-aside style="border-right: solid 1px #d3d3d3;transition: 0.5s" :width="isCollapse ?'70px':'200px'">
                <div style="text-align: center;padding: 10px 0">
                    <el-image src="../src/assets/logo.gif" style="height: 40px"/>
                </div>
                <el-menu
                        router
                        :default-active= "router.currentRoute.value.path"
                        :collapse="isCollapse"
                        style="border: none"
                        class="el-menu-vertical-demo"
                >
                    <el-menu-item index="/index">
                        <el-icon>
                            <ChatLineRound/>
                        </el-icon>
                        <span>广场</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-icon>
                            <document/>
                        </el-icon>
                        <span>表白墙</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon>
                            <setting/>
                        </el-icon>
                        <span>帖子管理</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon>
                            <MessageBox/>
                        </el-icon>
                        <span>收藏管理</span>
                    </el-menu-item>
                    <el-menu-item index="/index/settings">
                        <el-icon>
                            <User/>
                        </el-icon>
                        <span>个人中心</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style="border-bottom: solid 1px #d3d3d3;padding: 0 20px 0 0">
                    <div style="display: flex;padding: 6px 0">
                        <div>
                            <el-button :icon="isCollapse ? Expand : Fold" text @click="isCollapse = !isCollapse "
                                       style="font-size: 20px;margin-top: 10px"/>
                        </div>
                        <div style="flex: 1;text-align: center">
                            <el-input placeholder="请输入要搜索的内容" style="width: 400px;margin-top: 7px"
                            >
                                <template #prefix><el-icon> <Search/></el-icon></template>
                            </el-input>
                        </div>
                        <div style="display: flex">
                            <div style="text-align: right;margin: 10px 10px 0 0;line-height: 15px">
                                <div style="font-weight: bold">{{ store.auth.user?.username }}</div>
                                <div style="font-size: 13px">{{ store.auth.user?.email }}</div>
                            </div>
                            <el-dropdown>
                                <el-avatar :size="45" src="https://s2.loli.net/2023/07/17/yzHcQr6eGaoNYlK.jpg"/>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <el-icon><User/></el-icon>个人中心</el-dropdown-item>
                                        <el-dropdown-item style="color: #ff3535;" @click="logout">
                                            <el-icon><Back /></el-icon>退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>

                        </div>
                    </div>
                </el-header>
                <el-main style="padding: 0">
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup>
import {logout} from "@/net"
import router from "@/router";
import {Document, ChatLineRound, Setting, Search, MessageBox, User, Back, Fold, Expand} from '@element-plus/icons-vue'
import {ref} from "vue";
import {useStore} from "@/stores";

const store = useStore()
const isCollapse = ref(false)
</script>

<style scoped>

</style>