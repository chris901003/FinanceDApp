<template>
    <div id="top-style">
        <div id="filter-section">
            <div class="filter-section-container" @click="selectFilter('money')">
                <p :class="{'filter-section-background': true, 'filter-section-selected-background': filterSelection['money']}"></p>
                <div class="filter-section-box">
                    <img class="filter-section-img" src="../../../assets/loan/amount.png" alt="Amount">
                    <p class="filter-section-info">金額</p>
                </div>
            </div>
            <div class="filter-section-container" @click="selectFilter('repayTime')">
                <p :class="{'filter-section-background': true, 'filter-section-selected-background': filterSelection['repayTime']}"></p>
                <div class="filter-section-box">
                    <img class="filter-section-img" src="../../../assets/loan/time.png" alt="Time">
                    <p class="filter-section-info">時間</p>
                </div>
            </div>
            <div :class="{'filter-section-container': true, 'filter-sort-img-reverse': isReverseShow}" @click="reverseShow">
                <img id="filter-sort-img" src="../../../assets/loan/double-arrow.png" alt="Sort">
            </div>
        </div>
        <div id="loan-pay-card-section">
            <repayment-card-view v-for="info in allApplyLoans" :key="info.title" :loanInfo="info" @repayLoan="repayLoan"></repayment-card-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getFinacialContractRead, getFinacialContractWrite, bigNumberFormat, getProvider, parseToUint256 } from '../../../manager/ethersManager'
import { useEthersStore } from '../../../pinia/useEthersStore'
import repaymentCardView from './repaymentCardView.vue'

const filterSelection = reactive({
    money: false,
    repayTime: false
})
const isReverseShow = ref(false)
const ethersStore = useEthersStore()
const allApplyLoans = reactive(Array())
let provider = Object()
let signer = Object()

interface loanOutInfoInterface {
    loanId: number,
    title: String,
    loanOutMoney: number,
    intersetRate: number,
    announcedDeadline: String,
    repaymentDeadline: String
}

async function repayLoan(loanInfo: loanOutInfoInterface) {
    const writeAbleContract = getFinacialContractWrite(signer)
    const id = parseToUint256(loanInfo.loanId)
    const transaction = await writeAbleContract.payLoanMoney(id)
    const transactionResult = await transaction.wait()
    if (transactionResult.status != 1) {
        console.log("Repay Loan Error")
        return
    }
    console.log("Repay Success")
}

// 更新頁面中有選到的過濾器
function selectFilter(target: string) {
    if (!(target == "money" || target == "repayTime")) {
        return
    }
    if (target == "money") {
        filterSelection["repayTime"] = false
    } else if (target == "repayTime") {
        filterSelection["money"] = false
    }
    filterSelection[target] = !filterSelection[target]
    filterShow()
}

// 根據目前選擇的過濾器進行過濾
function filterShow() {
    if (filterSelection["money"]) {
        allApplyLoans.sort(sortedByMoney)
    } else if (filterSelection["repayTime"]) {
        allApplyLoans.sort(sortedByRepayTime)
    }
}

function sortedByMoney(loan1: loanOutInfoInterface, loan2: loanOutInfoInterface) {
    if (loan1.loanOutMoney < loan2.loanOutMoney) {
        return -1;
    } else {
        return 1;
    }
}

function sortedByRepayTime(loan1: loanOutInfoInterface, loan2: loanOutInfoInterface) {
    if (loan1.repaymentDeadline < loan2.repaymentDeadline) {
        return -1;
    } else {
        return 1;
    }
}

// 翻轉展示畫面順序
function reverseShow() {
    isReverseShow.value = !isReverseShow.value
    allApplyLoans.reverse()
}

onMounted(async () => {
    const currentProvider = await getProvider()
    await ethersStore.changeProvider(currentProvider)
    provider = currentProvider
    signer = provider.getSigner()
    const address = ethersStore.currentAddress

    const readOnlyContract = getFinacialContractRead(provider)
    const loans = await readOnlyContract.getMyLoanApply(address)
    const loansCount = loans.length

    for (let i = 0; i < loansCount; i++) {
        const loanId = bigNumberFormat(loans[i].id) * 1e18
        const expireYear = parseToUint256(loans[i].expireYear).toString()
        let expireMonth = parseToUint256(loans[i].expireMonth).toString()
        let expireDay = parseToUint256(loans[i].expireDay).toString()
        if (expireMonth.length == 1) {
            expireMonth = "0" + expireMonth
        }
        if (expireDay.length == 1) {
            expireDay = "0" + expireDay
        }
        const expireTime = expireYear + "-" + expireMonth + "-" + expireDay

        const announcedYear = parseToUint256(loans[i].announceYear).toString()
        let announcedMonth = parseToUint256(loans[i].announceMonth).toString()
        let announcedDay = parseToUint256(loans[i].announceDay).toString()
        if (announcedMonth.length == 1) {
            announcedMonth = "0" + announcedMonth
        }
        if (announcedDay.length == 1) {
            announcedDay = "0" + announcedDay
        }
        const announceTime = announcedYear + "-" + announcedMonth + "-" + announcedDay
        allApplyLoans.push({
            loanId: loanId,
            title: loans[i].title,
            loanOutMoney: bigNumberFormat(loans[i].loanAmount) * 1e18,
            intersetRate: bigNumberFormat(loans[i].loanInterset) * 1e18,
            announcedDeadline: announceTime,
            repaymentDeadline: expireTime
        })
    }
})
</script>

<style scoped>

#loan-pay-card-section {
    transform: scale(0);
    animation: loan-pay-card-section-animation 0.5s cubic-bezier(.45,.56,.4,1.32) forwards;
    animation-delay: 0.5s;
    display: flex;
    flex-wrap: wrap;
    width: 85vw;
    margin-top: 10rem;
    margin-bottom: 10rem;
    height: 58vh;
    overflow: auto;
}
@keyframes loan-pay-card-section-animation {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}
#loan-pay-card-section::-webkit-scrollbar {
    width: 0.5rem;
}

#top-style {
    display: flex;
    flex-direction: column;
}
#filter-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
}
.filter-section-box {
    display: flex;
    position: sticky;
    transform: translateY(-15rem);
}
.filter-section-container {
    text-align: center;
    margin-left: 5rem;
}
.filter-section-container:hover {
    cursor: pointer;
}
.filter-section-img {
    width: 10rem;
    height: 10rem;
    transform: translateX(-2rem) translateY(-2rem);
}
.filter-section-info {
    font-size: 10rem;
    line-height: 17rem;
    transform: translateX(-2rem);
}
.filter-section-background {
    width: 30rem;
    height: 13rem;
    background-color: rgb(255, 255, 255, 0.6);
    border: solid 0.5rem rgb(0, 0, 0, 0.8);
    border-radius: 3rem;
    transition: all 0.2s linear;
}
.filter-section-selected-background {
    background-color: #8FE3CF;
    box-shadow: 0px 0px 10px 2px rgb(0, 0, 0, 0.2);
}
#filter-sort-img {
    height: 8rem;
    width: 8rem;
    background-color: #85f3ff;
    padding: 3rem 3rem;
    border-radius: 10rem;
    transform: rotate(-90deg);
}
.filter-sort-img-reverse {
    transform: rotate(180deg) translateY(16.5rem);
}
</style>