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
                <div style="margin: 0 auto">
                    <input type="number" v-model="depositBalance" id="deposit-input-box" min="0" :max="handBalance" 
                    :class="{'no-enough-money': depositErrorState.depositBalanceError}">
                    <p v-show="depositErrorState.depositBalanceError" id="not-enough-money-info">{{ depositErrorState.depositBalanceErrorMessage }}</p>
                </div>
            </div>
            <div id="interset" class="one-line-style">
                <img src="../../assets/deposit/interest.png" alt="Interset" class="table-icon">
                <p>當前利率:</p>
                <p>{{ bankInterest }}</p>
            </div>
        </div>
        <div id="deposit-button">
            <div style="margin: 0 auto;" @click="depositFlow">
                <img src="../../assets/deposit/deposit3.png" alt="Deposit">
                <button>存款</button>
            </div>
        </div>
        <message-success-view :isShow="depositProcess.isTransferHandMoney" :message="depositProcess.transferMessage"></message-success-view>
        <message-success-view :isShow="depositProcess.isTransferBankMoney" :message="depositProcess.transferMessage"></message-success-view>
        <message-fail-view :isShow="depositErrorState.deductHandCashError" :message="depositErrorState.depositBalanceErrorMessage"></message-fail-view>
        <div class="blur-background" v-if="depositErrorState.depositCashToBankError" style="z-index=1"></div>
        <div id="re-deposit-balance-to-bank" v-show="depositErrorState.depositCashToBankError">
            <div style="text-align: center; margin: 30rem auto">
                <p>存款過程失敗</p>
                <p>請使用以下Token重新存款</p>
            </div>
            <p>{{ tokenForDirectDepositToBank }}</p>
            <input type="text" v-model="enterTokenForDirectDepositToBank" style="width: 50vw; margin: 5rem auto; font-size: 12rem; text-align: center;" 
            :class="{'no-enough-money': depositErrorState.reDepositTokenEnterError}">
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRaw, onMounted, ref, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useEthersStore } from '../../pinia/useEthersStore'
import { getFinacialContractRead, getFinacialContractWrite, parseToUint256, bigNumberFormat, getProvider } from '../../manager/ethersManager'
import messageSuccessView from '../common/messageSuccessBarView.vue'
import messageFailView from '../common/messageFailView.vue'

const ethersStore = useEthersStore()
let provider = Object()
let finacialContract = Object()
const coinName = ref("")
const coinSymbol = ref("")
const userAddress = ref("")
const handBalance = ref(10)
const bankBalance = ref(0)
const depositBalance = ref(0)
const bankInterest = ref(0)
const { data } = storeToRefs(ethersStore)
const { currentAddress } = storeToRefs(ethersStore)
const depositProcess = reactive({
    isTransferHandMoney: false,
    isTransferBankMoney: false,
    transferMessage: ref(""),
    isTransferBankMoneySuccess: false,
    isTransferBankMoneyFail: false
})
const depositErrorState = reactive({
    depositBalanceError: false,
    depositBalanceErrorMessage: ref(""),
    deductHandCashError: false,
    depositCashToBankError: false,
    reDepositTokenEnterError: false
})
let signer: Object
// 特殊Token在發生已扣除手中錢，但是未存入到銀行時可以使用
// 這裡會透過(當前時間+存入的錢+隨機值)進行Hash作為Token
// 因原始碼全部公開，所以這裡安全性極低(正在確定安全性中，感覺可以變成很安全)
const tokenForDirectDepositToBank = ref("")
const enterTokenForDirectDepositToBank = ref("")
// let reDepositToBankHandler: Function

async function depositFlow() {
    if (depositBalance.value == 0) {
        depositErrorState.depositBalanceErrorMessage = "金額至少為1"
        depositErrorState.depositBalanceError = true
        return
    }
    if (depositBalance.value > handBalance.value) {
        depositErrorState.depositBalanceErrorMessage = "餘額不足"
        depositErrorState.depositBalanceError = true
        return
    }
    const writeAbleContract = await getFinacialContractWrite(signer)
    const amount = parseToUint256(depositBalance.value)
    const transaction = await writeAbleContract.deposit(amount)
    depositProcess.transferMessage = "存款中"
    depositProcess.isTransferHandMoney = true
    const transactionResult = await transaction.wait()
    depositProcess.isTransferHandMoney = false
    if (transactionResult.status != 1) {
        depositErrorState.deductHandCashError = true
        depositErrorState.depositBalanceErrorMessage = "存款失敗"
        setTimeout(() => {
            depositErrorState.deductHandCashError = false
        }, 1000)
        return
    }
    await refreshAllowanceBalance()
    await refreshUserBalance()
    depositBalance.value = 0
}

// 刷新手上的金錢量
async function refreshAllowanceBalance() {
    const allowanceBalance = await finacialContract.handAmount(userAddress.value)
    handBalance.value = bigNumberFormat(allowanceBalance) * 1e18
}

// 刷新用戶金錢量
async function refreshUserBalance() {
    const currentBankBalance = await finacialContract.bankAmount(userAddress.value)
    bankBalance.value = bigNumberFormat(currentBankBalance) * 1e18
    const name = await finacialContract.name()
    coinName.value = name
    const symbol = await finacialContract.symbol()
    coinSymbol.value = symbol
    const interset = await finacialContract.getBankInterst()
    bankInterest.value = bigNumberFormat(interset) * 1e18
}

// 初始化需要先做的事情
onMounted(async () => {
    const currentProvider = await getProvider()
    await ethersStore.changeProvider(currentProvider)

    provider = toRaw(ethersStore.data.provider)
    // bankERC20SmartContract = getBankERC20SmartContractRead(provider)
    userAddress.value = ethersStore.data.address
    signer = provider.getSigner()

    finacialContract = getFinacialContractRead(provider)
    
    await refreshAllowanceBalance()
    await refreshUserBalance()
    startWatch()
})

function startWatch() {
    watch(currentAddress, async (newValue) => {
        userAddress.value = newValue
        await refreshAllowanceBalance()
        await refreshUserBalance()
    })
}
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
    box-sizing: border-box;
    width: 60rem;
    height: 15rem;
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
#deposit-button:hover {
    cursor: pointer;
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
.no-enough-money {
    border: solid 0.7rem #fe6060 !important;
    animation: shake 0.5s 1 !important;
}
#not-enough-money-info {
    text-align: center;
    font-size: 8rem !important;
    color: #e11d1d;
    animation: shake 0.5s 1 !important;
}
#re-deposit-balance-to-bank {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    text-align: center;
    z-index: 100;
    background-color: #ef5445;
    padding: 0rem 20rem;
    border-radius: 15rem;
    opacity: 0;
    animation: re-deposit-balance-to-bank-animation 0.5s linear forwards;
}
@keyframes re-deposit-balance-to-bank-animation {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
#re-deposit-balance-to-bank p {
    font-size: 20rem;
}
</style>

<style>
@keyframes shake {
    0% { 
        transform: translate(0, 0);
    }
    10%, 30%, 50% {
        transform: translate(-5rem, 0);
    }
    20%, 40% {
        transform: translate(5rem);
    }
    60% {
        transform: translate(0, 0);
    }
}
</style>
