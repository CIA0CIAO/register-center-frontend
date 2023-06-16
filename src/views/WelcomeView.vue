<template>
    <div style="width: 100vw;height: 100vh;overflow: hidden;display: flex">
        <div style="flex: 1">
            <el-image style="width: 100%;height: 100%" fit="cover" src="https://s2.loli.net/2023/04/21/O4WDpJLyPAHisgm.jpg"/>
        </div>
        <div class="welcome-title">
            <div style="font-size: 30px;font-weight: bold">欢迎来到我们的学习平台</div>
            <div style="margin-top: 20px">在这里你可以学习如何使用Java，如何搭建网站，并且与Java之父密切交流。</div>
            <div style="margin-top: 5px">在这里你可以同性交友，因为都是男的，没有学Java的女生。</div>
        </div>
        <div style="width: 420px;background-color: white;z-index: 1">
            <router-view v-slot="{ Component }">
                <!--      transition为跳转动效          -->
                <transition name="el-fade-in-linear" mode="out-in">
                    <component :is="Component" style="height: 100%"/>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.welcome-title {
    position: absolute;
    bottom: 30px;
    left: 10px;
    color: black;
    text-shadow: 0 0 10px #b7b7b7;
}

</style>