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
        <div class="blur-background" v-show="isShowAddLoadSheet"></div>
        <Transition name="add-loan">
            <div id="add-loan-view" v-show="isShowAddLoadSheet">
                <img src="../../../assets/xmark.png" alt="xmark" style="margin-left: auto; height: 10rem; width: 10rem; margin-top: 5rem" 
                @click="isShowAddLoadSheet=!isShowAddLoadSheet">
                <h3>新增借貸</h3>
                <div class="row-flex" style="margin-top: 5rem">
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; flex-direction: row;">
                            <img src="../../../assets/loan/title.png" alt="Title" style="height: 12rem; width: 12rem; margin-right: 2rem">
                            <p style="font-size: 12rem; line-height: 13rem;">標題</p>
                        </div>
                        <div style="display: flex; flex-direction: row; margin-top: 10rem">
                            <img src="../../../assets/loan/loan-out-money.png" alt="Loan out money" style="height: 12rem; width: 12rem; margin-right: 2rem">
                            <p style="font-size: 12rem; line-height: 13rem;">借出金額</p>
                        </div>
                        <div style="display: flex; flex-direction: row; margin-top: 10rem">
                            <img src="../../../assets/loan/interest-rate.png" alt="Interest Rate" style="height: 12rem; width: 12rem; margin-right: 2rem">
                            <p style="font-size: 12rem; line-height: 13rem;">利率</p>
                        </div>
                        <div style="display: flex; flex-direction: row; margin-top: 10rem;">
                            <img src="../../../assets/loan/calendar.png" alt="Calendar" style="height: 12rem; width: 12rem; margin-right: 2rem">
                            <p style="font-size: 12rem; line-height: 13rem;">發布到期日</p>
                        </div>
                        <div style="display: flex; flex-direction: row; margin-top: 10rem">
                            <img src="../../../assets/loan/calendar.png" alt="Calendar" style="height: 12rem; width: 12rem; margin-right: 2rem">
                            <p style="font-size: 12rem; line-height: 13rem;">還款日期</p>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <input type="text" v-model="loanInfo.title" :class="{'text-input-style': true, 'text-input-error': loanInfoError.isNoTitle}" 
                        @blur="loanInfo.title.length == 0 ? loanInfoError.isNoTitle = true : loanInfoError.isNoTitle = false">
                        <input type="number" v-model="loanInfo.loanOutMoney" min="0"
                        :class="{'text-input-style': true, 'text-input-error': loanInfoError.isLoanOutMoneyZero}"
                        @blur="loanInfo.loanOutMoney == 0 ? loanInfoError.isLoanOutMoneyZero = true : loanInfoError.isLoanOutMoneyZero = false">
                        <input type="number" v-model="loanInfo.intersetRate" min="0" step="0.01"
                        :class="{'text-input-style': true, 'text-input-warning': loanInfoError.isIntersetRateZero}"
                        @blur="loanInfo.intersetRate == 0 ? loanInfoError.isIntersetRateZero = true : loanInfoError.isIntersetRateZero = false">
                        <input type="date" v-model="loanInfo.announcedDeadline" :class="{'text-input-style': true, 'text-input-error': loanInfoError.isNotSetAnnouncedTime}"
                        :min="currentDate">
                        <input type="date" v-model="loanInfo.repaymentDeadline" 
                        :class="{'text-input-style': true, 'text-input-error': loanInfoError.isNotSetRepayTime || loanInfoError.repayTimeEarlyThenAnnouncedTime}"
                        :min="loanInfo.announcedDeadline">
                    </div>
                </div>
                <div style="display: flex; flex-wrap: wrap; justify-content: center;">
                    <p v-for="(item, idx) in loanInfoError.errorMessage" :key="item" style="font-size: 10rem; color: red; margin-right: 5rem">
                        {{ idx + 1 }} . {{ item }}
                    </p>
                </div>
                <div id="release-loan-out-button" @click="releaseLoanOut">
                    <img src="../../../assets/loan/release-loan-out.png" alt="Release" style="height: 12rem; width: 12rem">
                    <p style="font-size: 15rem; line-height: 14rem; margin-left: 3rem">發布</p>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'

let currentDate = ""
const searchInfo = ref("")
const isShowAddLoadSheet = ref(true)
const loanInfo = reactive({
    title: "",
    loanOutMoney: 0,
    intersetRate: 0,
    announcedDeadline: "",
    repaymentDeadline: ""
})

const loanInfoError = reactive({
    isNoTitle: false,
    isLoanOutMoneyZero: false,
    isIntersetRateZero: false,
    isNotSetAnnouncedTime: false,
    isNotSetRepayTime: false,
    repayTimeEarlyThenAnnouncedTime: false,
    errorMessage: Array()
})

let isStartWatchLoanOutInfo = false

function releaseLoanOut() {
    loanInfoError.errorMessage = Array()
    if (loanInfo.title.length == 0) {
        loanInfoError.isNoTitle = true
        loanInfoError.errorMessage.push("標題不可為空")
    }
    if (loanInfo.loanOutMoney == 0) {
        loanInfoError.isLoanOutMoneyZero = true
        loanInfoError.errorMessage.push("借出金額不可為零")
    }
    if (loanInfo.intersetRate == 0) {
        loanInfoError.isIntersetRateZero = true
        loanInfoError.errorMessage.push("建議設置利率")
    }
    if (loanInfo.announcedDeadline == null) {
        loanInfoError.isNotSetAnnouncedTime = true
        loanInfoError.errorMessage.push("請設置發布時間")
    }
    if (loanInfo.repaymentDeadline == null) {
        loanInfoError.isNotSetRepayTime = true
        loanInfoError.errorMessage.push("請設定還款日")
    }
    if ((loanInfo.announcedDeadline != null) && (loanInfo.repaymentDeadline != null)) {
        if (loanInfo.announcedDeadline > loanInfo.repaymentDeadline) {
            loanInfoError.repayTimeEarlyThenAnnouncedTime = true
            loanInfoError.errorMessage.push("結束時間不可早於開始時間")
        }
    }
    console.log(typeof(loanInfo.announcedDeadline))
    if (!isStartWatchLoanOutInfo) {
        isStartWatchLoanOutInfo = true
        startWatchLoanOutInfo()
    }
}

function startWatchLoanOutInfo() {
    watch(loanInfo, () => {
        if (loanInfo.title.length != 0) {
            loanInfoError.isNoTitle = false
            const idx = loanInfoError.errorMessage.indexOf("標題不可為空")
            if (idx != -1) {
                loanInfoError.errorMessage.splice(idx, 1)
            }
        }
        if (loanInfo.loanOutMoney != 0) {
            loanInfoError.isLoanOutMoneyZero = false
            const idx = loanInfoError.errorMessage.indexOf("借出金額不可為零")
            if (idx != -1) {
                loanInfoError.errorMessage.splice(idx, 1)
            }
        }
        if (loanInfo.intersetRate != 0) {
            loanInfoError.isIntersetRateZero = false
            const idx = loanInfoError.errorMessage.indexOf("建議設置利率")
            if (idx != -1) {
                loanInfoError.errorMessage.splice(idx, 1)
            }
        }
        if (loanInfo.announcedDeadline != null) {
            loanInfoError.isNotSetAnnouncedTime = false
            const idx = loanInfoError.errorMessage.indexOf("請設置發布時間")
            if (idx != -1) {
                loanInfoError.errorMessage.splice(idx, 1)
            }
        }
        if (loanInfo.repaymentDeadline != null) {
            loanInfoError.isNotSetRepayTime = false
            const idx = loanInfoError.errorMessage.indexOf("請設定還款日")
            if (idx != -1) {
                loanInfoError.errorMessage.splice(idx, 1)
            }
        }
        if (loanInfo.announcedDeadline <= loanInfo.repaymentDeadline) {
            loanInfoError.repayTimeEarlyThenAnnouncedTime = false
            const idx = loanInfoError.errorMessage.indexOf("結束時間不可早於開始時間")
            if (idx != -1) {
                loanInfoError.errorMessage.splice(idx, 1)
            }
        }
    })
}

onMounted(() => {
    let nowDate = new Date()
    var year = nowDate.getFullYear();
    var month = String(nowDate.getMonth() + 1).padStart(2, '0');
    var day = String(nowDate.getDate()).padStart(2, '0');
    var formattedDate = year + '-' + month + '-' + day;
    currentDate = formattedDate
    loanInfo.announcedDeadline = formattedDate
    loanInfo.repaymentDeadline = formattedDate
})
</script>

<style scoped>
.row-flex {
    display: flex;
    justify-content: space-evenly;
    width: 80%;
}
.text-input-style {
    all: unset;
    font-size: 8rem;
    background-color: rgb(255, 255, 255, 0.8);
    border-radius: 1rem;
    padding-left: 1rem;
    box-sizing: border-box;
    box-shadow: 0px 0px 2px 2px rgb(0, 0, 0, 0.2);
    margin-bottom: 11rem;
    border: solid 0.5rem rgb(0, 0, 0, 0);
}
.text-input-style:focus {
    animation: text-input-style-focus-animation 0.5s linear forwards;
}
@keyframes text-input-style-focus-animation {
    from {
        border: solid 0.5rem rgb(0, 0, 0, 0);
    }
    to {
        border: solid 0.5rem rgb(0, 0, 0, 1);
    }
}
.text-input-error {
    border: solid 0.5rem red !important;
    box-shadow: 0px 0px 2px 2px rgb(255, 0, 0, 0.2) !important;
    animation: error-shake 0.7s linear;
}
.text-input-warning {
    border: solid 0.5rem orange !important;
    box-shadow: 0px 0px 2px 2px rgb(255, 165, 0, 0.2) !important;
}
@keyframes error-shake {
    0%, 20%, 40% {
        transform: translateX(-5rem);
    }
    10%, 30% {
        transform: translateX(5rem);
    }
    45% {
        transform: translateX(0);
    }
}
#release-loan-out-button {
    display: flex;
    margin-top: 10rem;
    background-color: #62CDFF;
    padding: 3rem 10rem;
    border-radius: 3rem;
    box-shadow: 0px 0px 3rem 0.1rem rgb(0, 0, 0, 0.5);
    transition: all 0.2s linear;
}
#release-loan-out-button:hover {
    cursor: pointer;
    transform: scale(1.1);
}
</style>

<style scoped>
#add-loan-view {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 50vw;
    top: 15vh;
    transform: translate(-50%, 0%);
    z-index: 999;
    background-color: rgb(255, 255, 255, 0.5);
    width: 60vw;
    height: 65vh;
    overflow: auto;
    border-radius: 5rem;
    padding: 5rem 10rem;
}
#add-loan-view h3 {
    font-size: 15rem;
    margin-top: -10rem;
}
#add-loan-view img:hover {
    cursor: pointer;
}
.add-loan-enter-active, .add-loan-leave-active {
    transition: all 0.3s linear;
}
.add-loan-enter-from, .add-loan-leave-to {
    opacity: 0;
}
.add-loan-enter-to, .add-loan-leave-from {
    opacity: 1;
}
</style>

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
</style>