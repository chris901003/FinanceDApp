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
            <div id="address" class="one-line-style">
                <img src="../../assets/deposit/ewallet.png" alt="E-Wallet" class="table-icon">
                <p>錢包地址:</p>
                <p>{{ data.address }}</p>
            </div>
            <div id="cash" class="one-line-style">
                <img src="../../assets/deposit/cash.png" alt="Cash" class="table-icon">
                <p>手上現金:</p>
                <!-- TODO -->
                <!-- 這裡目前顯示的是銀行裡的錢，之後要改成手上的錢 -->
                <p>{{ handBalance }}</p>
            </div>
            <div id="bank" class="one-line-style">
                <img src="../../assets/deposit/bank.png" alt="BankMoney" class="table-icon">
                <p>戶頭金額:</p>
                <p>{{ bankBalance }}</p>
            </div>
            <div id="input-box" class="one-line-style">
                <img src="../../assets/deposit/deposit2.png" alt="Deposit" class="table-icon">
                <p>存款金額:</p>
                <input type="number" v-model="depositBalance" id="deposit-input-box" min="0" :max="handBalance">
            </div>
            <div id="interset" class="one-line-style">
                <img src="../../assets/deposit/interest.png" alt="Interset" class="table-icon">
                <p>當前利率:</p>
                <p>{{ bankInterest }}</p>
            </div>
        </div>
        <div id="deposit-button">
            <div style="margin: 0 auto;">
                <img src="../../assets/deposit/deposit3.png" alt="Deposit">
                <button>存款</button>
            </div>
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
let bankERC20SmartContract = Object()
const coinName = ref("")
const coinSymbol = ref("")
const userAddress = ref("")
const handBalance = ref(0)
const bankBalance = ref(0)
const depositBalance = ref(0)
const bankInterest = ref(0)
const { data } = storeToRefs(ethersStore)

onMounted(async () => {
    const currentProvider = await getProvider()
    await ethersStore.changeProvider(currentProvider)

    provider = toRaw(ethersStore.data.provider)
    bankERC20SmartContract = getERC20SmartContractRead(provider)
    userAddress.value = ethersStore.data.address

    const currentBankBalance = await bankERC20SmartContract.balanceOf(userAddress.value)
    bankBalance.value = bigNumberFormat(currentBankBalance) * 1e18
    const name = await bankERC20SmartContract.name()
    coinName.value = name
    const symbol = await bankERC20SmartContract.symbol()
    coinSymbol.value = symbol
    const interset = await bankERC20SmartContract.getBankInterst()
    bankInterest.value = bigNumberFormat(interset) * 1e18
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
    padding-left: 25rem;
}
#coin-info img {
    height: 15rem;
    width: 15rem;
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
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 8rem;
    width: 60vw;
    border: solid 1rem #62CDFF;
    border-radius: 2.5rem;
    padding: 5rem 15rem;
    opacity: 0;
    animation: withdraw-table-show 0.2s linear forwards;
    animation-delay: 0.7s;
}
@keyframes withdraw-table-show {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.one-line-style {
    display: flex;
}
.table-icon {
    height: 15rem;
    width: 15rem;
    margin-right: 3rem;
}
#address p:last-of-type {
    margin: 0 auto;
    font-size: 8rem;
    line-height: 15rem;
}
#cash, #bank, #input-box, #interset {
    margin-top: 5rem;
}
#address p:first-of-type, #cash p:first-of-type, #bank p:first-of-type, #input-box p:first-of-type, #interset p:first-of-type {
    font-size: 12rem;
}
#cash p:last-of-type, #bank p:last-of-type, #interset p:last-of-type {
    margin: 0 auto;
    font-size: 12rem;
}
#deposit-input-box {
    all: unset;
    margin: 0 auto;
    width: 50rem;
    font-size: 12rem;
    background-color: antiquewhite;
    padding: 1rem 5rem;
    border-radius: 2rem;
    text-align: center;
}
#deposit-button {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 15rem;
    width: 50rem;
    background-color: #62CDFF;
    padding: 2rem 15rem;
    border-radius: 5rem;
    box-shadow: 0px 0px 10px 3px rgb(0, 0, 0, 0.5);
    animation: deposit-button-animation 1s alternate infinite, withdraw-table-show 0.5s linear forwards;
    animation-delay: 1s;
    opacity: 0;
}
#deposit-button img {
    height: 15rem;
    width: 15rem;
}
#deposit-button button {
    all: unset;
    display: inline;
    font-size: 15rem;
    text-align: center;
}
@keyframes deposit-button-animation {
    from {
        transform: scale(0.8);
    }
    to {
        transform: scale(1.1);
    }
}
</style>