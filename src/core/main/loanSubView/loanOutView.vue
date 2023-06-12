<template>
    <div id="top-style">
        <div style="display: flex; align-items: center;">
            <div id="top-search-bar">
                <img src="../../../assets/loan/search.png" alt="Search">
                <input type="text" id="search-input-box" v-model="searchInfo">
                <div>
                    <div id="send-button-container"></div>
                    <img src="../../../assets/loan/paper-plane.png" alt="Send" id="search-button">
                </div>
            </div>
            <div>
                <p id="add-loan-out-button" @click="isShowAddLoadSheet=!isShowAddLoadSheet">新增</p>
                <div id="add-loan-background1"></div>
                <div id="add-loan-background2"></div>
                <div id="add-loan-background3"></div>
            </div>
        </div>
        <message-success-bar-view :isShow="isProcess" :message="processMessage"></message-success-bar-view>
        <div id="loan-out-info-section">
            <loan-out-card-view v-for="info in filterAnnouncedLoanOutInfo" :key="info.title" :loanOutInfo="info"
            style="margin: 10rem 5rem" @deleteLoanOut="deleteLoanOut"></loan-out-card-view>
        </div>
        <div class="blur-background" v-show="isShowAddLoadSheet"></div>
        <Transition name="add-loan">
            <new-loan-out-sheet v-show="isShowAddLoadSheet" 
            @closeSheet="isShowAddLoadSheet=!isShowAddLoadSheet" @addNewLoanOut="addNewLoanOut"></new-loan-out-sheet>
        </Transition>
        <message-success-view :isShow="isAddingLoanAnnounce" :message="addingLoanAnnounceMessage"></message-success-view>
        <message-fail-view :isShow="isProcessError" :message="errorMessage"></message-fail-view>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, toRaw } from 'vue'
import { getFinacialContractRead, getFinacialContractWrite, parseToUint256, getProvider, bigNumberFormat } from '../../../manager/ethersManager'
import { useEthersStore } from '../../../pinia/useEthersStore'
import newLoanOutSheet from './loanOutSheetView.vue'
import loanOutCardView from './loanOutCardView.vue'
import messageSuccessBarView from '../../common/messageSuccessBarView.vue'

const searchInfo = ref("")
const isShowAddLoadSheet = ref(false)
const announcedLoanOutInfo = reactive(Array())
const filterAnnouncedLoanOutInfo = reactive(Array())
const ethersStore = useEthersStore()
const isAddingLoanAnnounce = ref(false)
const addingLoanAnnounceMessage = ref("")
const isProcessError = ref(false)
const errorMessage = ref("")
const isProcess = ref(false)
const processMessage = ref("")

let provider = Object()
let signer: Object

interface loanOutInfoInterface {
    loanId: number,
    title: String,
    loanOutMoney: number,
    intersetRate: number,
    announcedDeadline: String,
    repaymentDeadline: String
}

// 添加新的借出資訊
async function addNewLoanOut(loanOutInfo: loanOutInfoInterface) {
    const writeAbleContract = getFinacialContractWrite(signer)
    const title = loanOutInfo.title
    const amount = parseToUint256(loanOutInfo.loanOutMoney)
    const interest = parseToUint256(loanOutInfo.intersetRate)
    const expireTime = loanOutInfo.repaymentDeadline.split("-")
    let year = Number(expireTime[0])
    let month = Number(expireTime[1])
    let day = Number(expireTime[2])
    const expireYear = parseToUint256(year)
    const expireMonth = parseToUint256(month)
    const expireDay = parseToUint256(day)
    const announceTime = loanOutInfo.announcedDeadline.split("-")
    year = Number(announceTime[0])
    month = Number(announceTime[1])
    day = Number(announceTime[2])
    const announceYear = parseToUint256(year)
    const announceMonth = parseToUint256(month)
    const announceDay = parseToUint256(day)
    const transaction = await writeAbleContract.announceLoan(
        title, amount, interest,
        announceYear, announceMonth, announceDay,
        expireYear, expireMonth, expireDay)
    isAddingLoanAnnounce.value = true
    addingLoanAnnounceMessage.value = "新增借貸中"
    processMessage.value = "新增借貸中"
    isProcess.value = true
    const transactionResult = await transaction.wait()
    isAddingLoanAnnounce.value = false
    isProcess.value = false
    if (transactionResult.status != 1) {
        errorMessage.value = "新增失敗"
        isProcessError.value = true
        setTimeout(() => {
            isProcessError.value = false
        }, 1000)
        return
    }
    announcedLoanOutInfo.push(loanOutInfo)
    filterAnnouncedLoanOutInfo.length = 0
    for (let i = 0; i < announcedLoanOutInfo.length; i++) {
        filterAnnouncedLoanOutInfo.push(announcedLoanOutInfo[i])
    }
    searchInfo.value = ""
}

// 移除借款
async function deleteLoanOut(loanOutInfo: loanOutInfoInterface) {
    const idx = announcedLoanOutInfo.indexOf(loanOutInfo)
    let id = 0
    if (idx != -1) {
        id = announcedLoanOutInfo[idx].loanId
        announcedLoanOutInfo.splice(idx, 1)
        const idx2 = filterAnnouncedLoanOutInfo.indexOf(loanOutInfo)
        if (idx2 != -1) {
            filterAnnouncedLoanOutInfo.splice(idx2, 1)
        }
    } else {
        console.log("不可能發生錯誤")
    }
    const writeAbleContract = getFinacialContractWrite(signer)
    const loanId = parseToUint256(id)
    const transaction = await writeAbleContract.removeLoanAnnounce(loanId)
    processMessage.value = "移除借貸中"
    isProcess.value = true
    await transaction.wait()
    isProcess.value = false
}

// 根據搜尋過濾
let lazyWathTimeOutId = 0
watch(searchInfo, (newValue) => {
    clearTimeout(lazyWathTimeOutId)

    lazyWathTimeOutId = setTimeout(() => {
        filterAnnouncedLoanOutInfo.length = 0
        for (let i = 0; i < announcedLoanOutInfo.length; i++) {
            if ((newValue.length != 0) && announcedLoanOutInfo[i].title.includes(newValue)) {
                filterAnnouncedLoanOutInfo.push(announcedLoanOutInfo[i])
            } else if (newValue.length == 0) {
                filterAnnouncedLoanOutInfo.push(announcedLoanOutInfo[i])
            }
        }
    }, 300)
})

onMounted(async () => {
    const currentProvider = await getProvider()
    await ethersStore.changeProvider(currentProvider)
    provider = toRaw(ethersStore.data.provider)
    const address = ethersStore.currentAddress
    const readOnlyContract = getFinacialContractRead(provider)
    signer = provider.getSigner()

    const loans = await readOnlyContract.getMyLoanAnnounce(address)
    const loanCount = loans.length
    for (let i = 0; i < loanCount; i++) {
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

        announcedLoanOutInfo.push({
            loanId: loanId,
            title: loans[i].title,
            loanOutMoney: parseToUint256(loans[i].loanAmount),
            intersetRage: parseToUint256(loans[i].loanInterset),
            announcedDeadline: announceTime,
            repaymentDeadline: expireTime
        })
    }
    for (let i = 0; i < announcedLoanOutInfo.length; i++) {
        filterAnnouncedLoanOutInfo.push(announcedLoanOutInfo[i])
    }
})
</script>

<style scoped>
#top-style {
    display: flex;
    flex-direction: column;
}
#top-search-bar {
    display: flex;
    flex-direction: row;
    padding: 3rem 5rem;
    background-color: rgb(255, 255, 255, 0.5);
    border-radius: 8rem;
    align-items: center;
    width: 0vw;
    animation: top-search-bar-animation 0.7s linear forwards;
}
@keyframes top-search-bar-animation {
    from {
        width: 0rem;
    }
    to {
        width: 60vw;
    }
}
#top-search-bar img {
    width: 6rem; 
    height: 6rem;
    margin-right: 3rem;
    opacity: 0;
    animation: opacity-animation 0.5s linear forwards;
}
#top-search-bar img:hover {
    cursor: pointer;
}
#search-input-box {
    all: unset;
    font-size: 8rem;
    width: 100%;
}
#send-button-container {
    position: absolute;
    width: 23rem;
    height: 23rem;
    transform: translate(-6.5rem, -7rem);
    border-radius: 20rem;
    background-color: black;
    box-shadow: 0px 0px 3rem 0.8rem rgb(0, 0, 0, 0.5);
}
#send-button-container:hover {
    cursor: pointer;
}
#search-button {
    filter: invert(100%) saturate(0);
    width: 8rem !important;
    height: 8rem !important;
}
#add-loan-out-button {
    margin-left: 10rem;
    font-size: 8rem;
    background-color: black;
    color: white;
    padding: 2rem 10rem;
    border-radius: 3rem;
    opacity: 0;
    animation: add-loan-out-button-keep-animation 1s ease-in-out alternate infinite,
    opacity-animation 0.5s linear forwards;
    animation-delay: 1s;
}
@keyframes add-loan-out-button-keep-animation {
    from {
        transform: scale(0.85);
    }
    to {
        transform: scale(1);
    }
}
#add-loan-out-button:hover {
    cursor: pointer;
}
#add-loan-background1 {
    position: absolute;
    width: 24rem;
    height: 10rem;
    border: solid 0.5rem rgb(0, 0, 0, 0.3);
    border-radius: 2rem;
    opacity: 0;
    animation: add-load-background-aniamtion 2s linear infinite;
    animation-delay: 2s;
    pointer-events: none;
}
#add-loan-background2 {
    position: absolute;
    width: 24rem;
    height: 10rem;
    border: solid 0.5rem rgb(0, 0, 0, 0.3);
    border-radius: 2rem;
    opacity: 0;
    animation: add-load-background-aniamtion 2s linear infinite;
    animation-delay: 2.2s;
    pointer-events: none;
}
#add-loan-background3 {
    position: absolute;
    width: 24rem;
    height: 10rem;
    border: solid 0.5rem rgb(0, 0, 0, 0.3);
    border-radius: 2rem;
    opacity: 0;
    animation: add-load-background-aniamtion 2s linear infinite;
    animation-delay: 2.4s;
    pointer-events: none;
}
@keyframes add-load-background-aniamtion {
    0% {
        transform: translateX(13.5rem) translateY(-13rem) scale(0);
        opacity: 0;
    }
    40% {
        transform: translateX(13.5rem) translateY(-13rem) scale(1);
        opacity: 1;
    }
    80% {
        transform: translateX(13.5rem) translateY(-13rem) scale(2);
        opacity: 0;
    }
    100% {
        transform: translateX(13.5rem) translateY(-13rem) scale(2);
        opacity: 0;
    }
}
#loan-out-info-section {
    display: flex; 
    flex-wrap: wrap;
    margin-top: 5rem;
    height: 65vh;
    overflow: auto;
}
#loan-out-info-section::-webkit-scrollbar {
    width: 0.5rem;
}
</style>