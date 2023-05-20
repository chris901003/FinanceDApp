<template>
    <div class="main-background main-style top-style">
        <div id="title">
            <img src="../../assets/wallet.png" alt="電子錢包">
            <p id="title-info">先連結錢包吧</p>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
onMounted(() => {
    const { ethereum } = window as any
    if (!ethereum) {
        router.replace({
            path: '/metamask/without-metamask'
        })
    } else {
        router.replace({
            path: '/metamask/link-to-metamask'
        })
    }
})
</script>

<style scoped>
.top-style {
    display: flex;
    flex-direction: column;
}
#title {
    display: flex;
    justify-content: center;
    margin: 30rem 0px;
}
#title img {
    height: 25rem;
    width: 25rem;
}
#title-info {
    font-size: 25rem;
    line-height: 30rem;
}
</style>