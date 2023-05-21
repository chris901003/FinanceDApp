<template>
    <div id="top-style">
        <img src="../../assets/wallet.png" alt="Wallet" id="web-icon" @click="emits('showNavigationSection')">
        <h1 id="title">Financel DApp</h1>
        <p id="address">錢包地址:{{ ethersStore.data.address }}</p>
    </div>
</template>

<script setup lang="ts">
import { useEthersStore } from '../../pinia/useEthersStore.js'
import { defineEmits } from 'vue'

const emits = defineEmits<{
    (e: 'showNavigationSection'): void
}>()
const ethersStore = useEthersStore()
</script>

<style scoped>
#top-style {
    display: flex;
    flex-direction: row;
    margin: 5rem;
}
#web-icon {
    height: 20rem;
    width: 20rem;
}
#title {
    font-size: 20rem;
}
#address {
    margin-left: auto;
    font-size: 8rem;
    line-height: 28rem;
}
</style>