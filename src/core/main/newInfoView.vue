<template>
    <div id="top-style">
        <div style="display: flex; margin-right: auto">
            <img src="../../assets/navigation/news.png" alt="" style="height: 15rem; width: 15rem">
            <p id="title-info">最新資訊</p>
        </div>
        <div class="sub-info">
            <div style="flex" class="block-info" id="block-number">
                <img src="../../assets/newInfo/block-number.png" alt="BlockNumber">
                <p>區塊總數: {{ totalBlock }}</p>
            </div>
            <div style="flex" class="block-info">
                <img src="../../assets/newInfo/ether-gas.png" alt="EtherGas">
                <p>當前Gas消耗: {{ currentGasPrice }}</p>
            </div>
        </div>
        <div class="block-info">
            <div style="display: flex;">
                <img src="../../assets/newInfo/recommend.png" alt="Recommend">
                <p id="recommend-title">建議Gas設置</p>
            </div>
            <div style="margin-left: 20rem">
                <p>Last base fee per gas: {{ recommendGasInfo.lastBaseFeePerGas }}</p>
                <p>Max fee per gas: {{ recommendGasInfo.maxFeePerGas }}</p>
                <p>Max priority fee per gas: {{ recommendGasInfo.maxPriorityFeePerGas }}</p>
            </div>
        </div>
        <div id="notice">
            <p>此處不保證為最新狀態</p>
            <p>若要獲取絕對最新請刷新瀏覽器</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRaw, reactive } from 'vue';
import { getProvider, watchBlocksNumber, bigNumberFormat } from '../../manager/ethersManager'
import { useEthersStore } from '../../pinia/useEthersStore'

const ethersStore = useEthersStore()
const totalBlock = ref(0)
const currentGasPrice = ref(0)
const recommendGasInfo = reactive({
    lastBaseFeePerGas: 0,
    maxFeePerGas: 0,
    maxPriorityFeePerGas: 0
})

// 在監聽到新block時需要做的事情
async function blockNumberHandler(blockNumber: number) {
    totalBlock.value = blockNumber
    await getCurrentGasPrice()
    await getRecommendGasSet()
}

// 獲取當gas值
async function getCurrentGasPrice() {
    const provider = toRaw(ethersStore.data.provider)
    const gasPrice = bigNumberFormat(await provider.getGasPrice())
    currentGasPrice.value = gasPrice
}

async function getRecommendGasSet() {
    const provider = toRaw(ethersStore.data.provider)
    const recommentGas = await provider.getFeeData()
    const lastBaseFeePerGas = bigNumberFormat(recommentGas["lastBaseFeePerGas"])
    const maxFeePerGas = bigNumberFormat(recommentGas["maxFeePerGas"])
    const maxPriorityFeePerGas = bigNumberFormat(recommentGas["maxPriorityFeePerGas"])
    recommendGasInfo.lastBaseFeePerGas = lastBaseFeePerGas
    recommendGasInfo.maxFeePerGas = maxFeePerGas
    recommendGasInfo.maxPriorityFeePerGas = maxPriorityFeePerGas
}

onMounted(async () => {
    const provider = await getProvider()
    ethersStore.changeProvider(provider)

    watchBlocksNumber(provider, blockNumberHandler)
    await getRecommendGasSet()
})
</script>

<style scoped>
#top-style {
    margin: 0rem 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#title-info {
    font-size: 18rem;
    line-height: 16rem;
    margin-left: 3rem;
}
.sub-info {
    display: flex;
}
.block-info {
    margin-top: 20rem;
    margin-left: 15rem;
}
.block-info img {
    height: 18rem;
    width: 18rem;
}
.block-info p {
    font-size: 12rem;
}
#block-number {
    margin-right: 15rem;
}
#recommend-title {
    line-height: 20rem;
    margin-left: 3rem;
}
#notice {
    margin-top: 10rem;
    padding: 3rem 15rem;
    background-color: #0072b9;
    border-radius: 5rem;
}
#notice p {
    text-align: center;
    font-size: 8rem;
    color: white;
}
</style>