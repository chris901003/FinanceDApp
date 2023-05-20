<template>
    <div>
        Main View
    </div>
</template>

<script setup lang="ts">
import { useEthersStore } from '../../pinia/useEthersStore'
import { getProvider, watchIsMetaMasStateChange } from '../../manager/ethersManager'
import { onMounted } from 'vue'

const ethersStore = useEthersStore()

// 監看是否有更換帳號或是斷開MetaMask連接
watchIsMetaMasStateChange()

onMounted(async () => {
    // 獲取Provider資料
    const provider = await getProvider()
    ethersStore.changeProvider(provider)
})
</script>