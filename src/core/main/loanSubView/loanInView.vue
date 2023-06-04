<template>
    <div id="top-style">
        <div style="display: flex; width: 83vw">
            <div id="search-bar">
                <input type="text" id="search-input" placeholder="搜尋" v-model="search">
                <img src="../../../assets/loan/search2.png" alt="Search" id="search-img" @click="searchLoan">
            </div>
            <div style="display: flex; flex-direction: column;">
                <div style="margin-left: 5rem; margin-top: -6rem; display: flex; flex-direction: row; opacity: 0; animation: opacity-animation 0.5s linear forwards;">
                    <div style="font-size: 8rem;">Filter</div>
                    <img src="../../../assets/loan/filter.png" alt="" style="width: 4rem; height: 4rem; margin-top: 2.5rem; margin-left: 2rem">
                </div>
                <div id="filter-section">
                    <div class="filter-box-container" style="z-index: 3" @click="selectedFilter(0)">
                        <div class="filter-box-background"></div>
                        <p :class="{'filter-box-style': true, 'filter-box-style-selected': filterSelected == 0}">金額</p>
                    </div>
                    <div class="filter-box-container" style="animation-delay: 0.5s; z-index: 2" @click="selectedFilter(1)">
                        <div class="filter-box-background"></div>
                        <P :class="{'filter-box-style': true, 'filter-box-style-selected': filterSelected == 1}">利息</P>
                    </div>
                    <div class="filter-box-container" style="animation-delay: 1s; z-index: 1" @click="selectedFilter(2)">
                        <div class="filter-box-background"></div>
                        <p :class="{'filter-box-style': true, 'filter-box-style-selected': filterSelected == 2}">時間</p>
                    </div>
                    <img src="../../../assets/loan/double-arrow.png" alt="AES OR DES" id="filter-order-button" @click="reverseSequence"
                    :class="{'filter-order-button-reverse': isReverse}">
                </div>
            </div>
        </div>
        <div id="loan-in-card-section">
            <loan-in-card-view v-for="info in showLoanInfo" :key="info.title" :loanInInfo="info" @loanIn="loanIn"></loan-in-card-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import loanInCardView from './loanInCardView.vue'
import { ref, reactive, onMounted } from 'vue'

const search = ref("")
const filterSelected = ref(-1)
const isReverse = ref(false)
let loanInfo = Array()
const showLoanInfo = reactive(Array())

interface loanOutInfoInterface {
    title: String,
    loanOutMoney: number,
    intersetRate: number,
    announcedDeadline: String,
    repaymentDeadline: String
}

// 搜尋指定名稱
function searchLoan() {
    showLoanInfo.length = 0
    if (search.value.length == 0) {
        for (let i = 0; i < loanInfo.length; i++) {
            showLoanInfo.push(loanInfo[i])
        }
    } else {
        for (let i = 0; i < loanInfo.length; i++) {
            if (loanInfo[i].title.includes(search.value)) {
                showLoanInfo.push(loanInfo[i])
            }
        }
    }
}

// 選取過濾器時觸發
function selectedFilter(target: number) {
    // 0 => 金額, 1 => 利息, 2 => 時間
    if (filterSelected.value == target) {
        filterSelected.value = -1
    } else {
        filterSelected.value = target
    }
    if (filterSelected.value == 0) {
        showLoanInfo.sort(sortedByAmount)
    } else if (filterSelected.value == 1) {
        showLoanInfo.sort(sortedByRate)
    } else if (filterSelected.value == 2) {
        showLoanInfo.sort(sortedByDate)
    } else {
        search.value = ""
        showLoanInfo.length = 0
        for (let i = 0; i < loanInfo.length; i++) {
            showLoanInfo.push(loanInfo[i])
        }
    }
}

function sortedByAmount(loan1: loanOutInfoInterface, loan2: loanOutInfoInterface) {
    return loan1.loanOutMoney - loan2.loanOutMoney
}

function sortedByRate(loan1: loanOutInfoInterface, loan2: loanOutInfoInterface) {
    return loan1.intersetRate - loan2.intersetRate
}

function sortedByDate(loan1: loanOutInfoInterface, loan2: loanOutInfoInterface) {
    if (loan1.repaymentDeadline < loan2.repaymentDeadline) {
        return -1
    } else {
        return 1;
    }
}

// 反轉排序順序
function reverseSequence() {
    isReverse.value = !isReverse.value
    let tmp = Array()
    for (let i = 0; i < showLoanInfo.length; i++) {
        tmp.push(showLoanInfo[i])
    }
    const dataLen = tmp.length
    showLoanInfo.length = 0
    for (let i = dataLen - 1; i >= 0; i--) {
        showLoanInfo.push(tmp[i])
    }
}

// 借款
function loanIn(loanInfo: loanOutInfoInterface) {
    // TODO: 與合約交互，等合約完成後繼續
    console.log(loanInfo)
}

onMounted(() => {
    getMockData()
})

// 獲取假資料
function getMockData() {
    for (let i = 0; i < 10; i++) {
        loanInfo.push({
            title: "Title: " + i,
            loanOutMoney: 100 + i,
            intersetRate: 1 + i * 0.1,
            announcedDeadline: '2023-06-01',
            repaymentDeadline: '2023-06-03'
        })
    }
    loanInfo.push({
        title: "Title: 10",
        loanOutMoney: 1000,
        intersetRate: 1.3,
        announcedDeadline: '2023-06-07',
        repaymentDeadline: '2023-06-11'
    })
    loanInfo.push({
        title: "Title: 11",
        loanOutMoney: 10,
        intersetRate: 2.0,
        announcedDeadline: '2023-05-20',
        repaymentDeadline: '2023-05-28'
    })
    for (let i = 0; i < loanInfo.length; i++) {
        showLoanInfo.push(loanInfo[i])
    }
}
</script>

<style scoped>
#loan-in-card-section {
    transform: scale(0);
    animation: loan-in-card-section-animation 0.5s cubic-bezier(.45,.56,.4,1.32) forwards;
    animation-delay: 1.5s;
    display: flex;
    flex-wrap: wrap;
    width: 85vw;
    margin-top: 10rem;
    margin-bottom: 10rem;
    height: 58vh;
    overflow: auto;
}
@keyframes loan-in-card-section-animation {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}
#loan-in-card-section::-webkit-scrollbar {
    width: 0.5rem;
}
#filter-order-button {
    height: 8rem;
    width: 8rem;
    margin-left: 10rem;
    background-color: #85F4FF;
    padding: 3rem;
    border-radius: 13rem;
    margin-bottom: 3rem;
    transform: scale(0) rotate(-90deg);
    animation: filter-order-button-animation 0.3s cubic-bezier(.45,.56,.4,1.32) forwards;
    animation-delay: 1.5s;
}
@keyframes filter-order-button-animation {
    from {
        transform: scale(0) rotate(-90deg);
    }
    to {
        transform: scale(1) rotate(-90deg);
    }
}
.filter-order-button-reverse {
    transform: scale(1) rotate(90deg) !important;
}
#filter-order-button:hover {
    cursor: pointer;
}
.filter-box-container {
    width: 30rem;
    margin-left: 5rem;
    margin-bottom: 2.5rem;
    transform: translateX(-50rem);
    opacity: 0;
    animation: filter-box-container-animation 0.5s linear forwards;
}
@keyframes filter-box-container-animation {
    from {
        transform: translateX(-50rem);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
.filter-box-container:hover {
    cursor: pointer;
}
.filter-box-style {
    position: sticky;
    font-size: 8rem;
    width: 25rem;
    margin: 0 auto;
    margin-top: -13rem;
    background-color: #ffffff;
    text-align: center;
    z-index: 2;
    border-radius: 3rem;
    transition: all 0.2s linear;
}
.filter-box-style-selected {
    background-color: greenyellow !important;
}
.filter-box-background {
    position: sticky;
    width: 30rem;
    height: 15rem;
    background-color: #efedec;
    z-index: 1;
    border-radius: 3rem;
}
#filter-section {
    display: flex;
    flex-direction: row;
    align-items: center;
}
#top-style {
    display: flex;
    flex-direction: column;
}
#search-bar {
    display: flex;
    width: 60vw;
    height: 7vh;
    background-color: #efedec;
    border-radius: 5rem;
    z-index: 10;
}
#search-input {
    all: unset;
    margin: 2rem 2rem;
    width: 76%;
    height: 70%;
    border: solid 0.5rem #DCDCDC;
    background-color: white;
    margin: auto 3rem;
    font-size: 8rem;
    padding: 0px 5rem;
    border-radius: 5rem;
    animation: scale-animation 0.5s cubic-bezier(.45,.56,.4,1.32) forwards;
}
#search-img {
    height: 8rem;
    width: 8rem;
    margin: auto 0;
    background-color: #e77f3a;
    padding: 3.5rem 3.5rem;
    border-radius: 5rem;
    animation: scale-animation 0.5s cubic-bezier(.45,.56,.4,1.32) forwards;
}
#search-img:hover {
    cursor: pointer;
}
@keyframes scale-animation {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}
</style>