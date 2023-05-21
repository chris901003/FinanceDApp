<template>
    <div id="top-style">
        <div style="display: flex;" id="deposit-title">
            <img src="../../assets/navigation/deposit.png" alt="Deposit">
            <p>存款</p>
        </div>
        <div>
            <div style="display: flex" id="coin-info">
                <img src="../../assets/deposit/coin.png" alt="Coin">
                <p>代幣名稱: {{ coinName }}</p>
                <p>代號: {{ coinSymbol }}</p>
            </div>
        </div>
        <div id="withdraw-table">
            <p>錢包地址: {{ data.address }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRaw, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useEthersStore } from '../../pinia/useEthersStore'
import { getERC20SmartContractRead, getProvider, bigNumberFormat } from '../../manager/ethersManager'

const ethersStore = useEthersStore()
let provider = Object()
let erc20SmartContract = Object()
const coinName = ref("")
const coinSymbol = ref("")
const { data } = storeToRefs(ethersStore)

onMounted(async () => {
    const currentProvider = await getProvider()
    ethersStore.changeProvider(currentProvider)

    provider = toRaw(ethersStore.data.provider)
    erc20SmartContract = getERC20SmartContractRead(provider)

    const balance = await erc20SmartContract.balanceOf('0x70Cb097c34A77053A6610e4022AbD4243193Cdbb')
    console.log(bigNumberFormat(balance) * 1e18)
    const name = await erc20SmartContract.name()
    console.log(name)
    const symbol = await erc20SmartContract.symbol()
    console.log(symbol)
    const totalSupply = await erc20SmartContract.totalSupply()
    console.log(bigNumberFormat(totalSupply) * 1e18)

    coinName.value = name
    coinSymbol.value = symbol
})
</script>

<style scoped>
#top-style {
    margin: 0rem 20rem;
}
#deposit-title img {
    width: 25rem;
    height: 25rem;
}
#deposit-title p {
    font-size: 18rem;
    margin-left: 3rem;
    line-height: 25rem;
}
#coin-info {
    animation: coin-info-animation 0.5s cubic-bezier(.45,.56,.4,1.32) forwards;
}
#coin-info img {
    height: 15rem;
    width: 15rem;
    margin-left: 25rem;
    margin-top: 15rem;
    margin-right: 3rem;
}
#coin-info p {
    font-size: 10rem;
    margin-right: 25rem;
    margin-top: 15rem;
}
@keyframes coin-info-animation {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
#withdraw-table {
    /* display: flex;
    flex-direction: column; */
}
</style>