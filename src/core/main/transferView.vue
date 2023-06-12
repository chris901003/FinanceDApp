<template>
    <div id="top-style">
        <div style="display: flex;" id="transfer-title">
            <img src="../../assets/navigation/transfer.png" alt="Transfer">
            <p>轉帳</p>
        </div>
        <div style="margin-top: 50rem; display: flex; flex-direction: column; align-items: center;">
            <div id="bank" class="one-line-style">
                <img src="../../assets/deposit/bank.png" alt="BankMoney" class="table-icon">
                <p>戶頭金額:</p>
                <p>{{ bankMoney }}</p>
            </div>
            <div id="address" class="one-line-style">
                <img src="../../assets/deposit/ewallet.png" alt="E-Wallet" class="table-icon">
                <p>轉帳地址:</p>
                <input type="text" v-model="targetAddress" id="transfer-address">
            </div>
            <div id="address" class="one-line-style">
                <img src="../../assets/deposit/coin.png" alt="E-Wallet" class="table-icon">
                <p>轉帳金額:</p>
                <input type="number" v-model="transferMoney" id="transfer-address" :max="bankMoney">
            </div>
            <button id="transfer-button" @click="transferMoneyToTarget">轉帳</button>
        </div>
        <message-success-view :isShow="isProcess" :message="loadingMessage"></message-success-view>
        <message-fail-view :isShow="isProcessError" :message="errorMessage"></message-fail-view>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue'
import { getFinacialContractRead, getFinacialContractWrite, getProvider, bigNumberFormat, parseToUint256 } from '../../manager/ethersManager'
import { useEthersStore } from '../../pinia/useEthersStore'
import messageSuccessView from '../common/messageSuccessBarView.vue'
import messageFailView from '../common/messageFailView.vue'

const ehtersStore = useEthersStore()
const handMoney = ref(0)
const bankMoney = ref(0)
const targetAddress = ref("")
const transferMoney = ref(0)
const isProcess = ref(false)
const loadingMessage = ref("")
const isProcessError = ref(false)
const errorMessage = ref("")
let provider = Object()
let signer = Object()
let finacialContract = Object()
let address = ""

// 進行轉帳
async function transferMoneyToTarget() {
    if (targetAddress.value.length == 0) {
        errorMessage.value = "請輸入地址"
        isProcessError.value = true
        setTimeout(() => {
            isProcessError.value = false
        }, 5000)
        return
    }
    if (transferMoney.value > bankMoney.value) {
        errorMessage.value = "戶頭金額不足"
        isProcessError.value = true
        setTimeout(() => {
            isProcessError.value = false
        }, 5000);
    }
    if (transferMoney.value <= 0) {
        errorMessage.value = "轉出金額不可小於1"
        isProcessError.value = true
        setTimeout(() => {
            isProcessError.value = false
        }, 5000)
    }
    const writeAbleContract = getFinacialContractWrite(signer)
    const amount = parseToUint256(transferMoney.value)
    const transaction = await writeAbleContract.transfer(address, targetAddress.value, amount)
    loadingMessage.value = "轉帳中"
    isProcess.value = true
    const transactionResult = await transaction.wait()
    isProcess.value = false
    if (transactionResult.status != 1) {
        errorMessage.value = "轉帳失敗"
        isProcessError.value = true
        setTimeout(() => {
            isProcessError.value = false
        }, 5000)
    }
    refreshBalance()
}

// 更新當前手中以及銀行中的金錢
async function refreshBalance() {
    const handQuery = await finacialContract.handAmount(address)
    handMoney.value = Math.floor(bigNumberFormat(handQuery) * 1e18)
    const bankQuery = await finacialContract.bankAmount(address)
    bankMoney.value = Math.floor(bigNumberFormat(bankQuery) * 1e18)
}

onMounted(async () => {
    const currentProvider = await getProvider()
    await ehtersStore.changeProvider(currentProvider)
    provider = toRaw(ehtersStore.data.provider)
    signer = provider.getSigner()
    
    finacialContract = getFinacialContractRead(provider)
    address = ehtersStore.data.address
    await refreshBalance()
})
</script>

<style scoped>
#top-style {
    margin: 0rem 20rem;
}
#transfer-title img {
    width: 20rem;
    height: 20rem;
}
#transfer-title p {
    font-size: 16rem;
    margin-left: 3rem;
    line-height: 20rem;
}
.one-line-style {
    display: flex;
    margin-bottom: 10rem;
}
.table-icon {
    height: 15rem;
    width: 15rem;
    margin-right: 3rem;
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
#transfer-address {
    all: unset;
    font-size: 10rem;
    padding: 3rem 5rem;
    background-color: antiquewhite;
    margin-left: 20rem;
}
#transfer-button {
    all: unset;
    font-size: 12rem;
    text-align: center;
    width: 40rem;
    padding: 3rem 8rem;
    background-color: aqua;
    border-radius: 5rem;
    margin-top: 20rem;
}
#transfer-button:hover {
    cursor: pointer;
}
</style>
