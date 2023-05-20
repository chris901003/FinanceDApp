<template>
    <div>
        <img src="../../assets/xmark.png" alt="關閉" id="reject-eula" @click="emit('changeEulaState')">
        <h3>使用者條款</h3>
        <p class="info">(1) 禁止以任何方式對本站進行各種破壞行為</p>
        <p class="info">(2) 煽動民族仇恨、民族歧視，破壞民族團結的內容</p>
        <p class="info">(3) 捏造或者歪曲事實，散佈謠言，擾亂社會秩序的內容</p>
        <p class="info">(4) 宣揚封建迷信、淫穢、色情、賭博、暴力、兇殺、恐怖、教唆犯罪的內容</p>
        <p class="info">(5) 公然侮辱他人或者捏造事實誹謗他人的，或者進行其他惡意攻擊的內容</p>
        <p id="agree" @click="routeToMainView">同意</p>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits<{
    (e: 'changeEulaState'): void
}>()

function routeToMainView() {
    router.push({
        path: '/main'
    })
}
</script>

<style scoped>
#reject-eula {
    margin: 0 0 0 95%;
    width: 3rem;
    height: 3rem;
}
#reject-eula:hover {
    cursor: pointer;
}
h3 {
    margin: 0 auto;
    font-size: 12rem;
}
.info {
    font-family: monospace;
    font-size: 6rem;
}
#agree {
    margin: 0 auto;
    font-size: 10rem;
    background-color: #12b9e6;
    color: white;
    padding: 0.5rem 12rem;
    border-radius: 2rem;
}
#agree:hover {
    cursor: pointer;
    background-color: #2aa5d3;
    box-shadow: 0px 0px 10px 1px rgb(0, 0, 0, 0.2);
}
</style>