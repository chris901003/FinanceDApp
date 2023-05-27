<template>
    <div id="top-style">
        <div style="display: flex; margin-right: auto">
            <img src="../../assets/navigation/earn-money.png" alt="EarnMoney" style="height: 15rem; width: 15rem">
            <p id="title-info">賺錢</p>
        </div>
        <p id="top-info">通過以下問題即可獲得100代幣</p>
        <div id="question-count-section">
            <p style="font-size: 12rem;">{{ currentQuestionCount }}</p>
            <p style="font-size: 25rem; line-height: 25rem;">/</p>
            <p style="font-size: 12rem; line-height: 30rem;">10</p>
        </div>
        <div id="question">
            <p>{{ firstNumber }}</p>
            <img src="../../assets/earnMoney/plus.png" alt="+">
            <p>{{ secondNumber }}</p>
        </div>
        <div id="answer">
            <img src="../../assets/earnMoney/equal.png" alt="=">
            <input type="text" id="answer-input-box" v-model="answer">
            <div id="answer-under-line" :class="{'wrong-answer-under-line': isWrongAnswer}"></div>
            <p v-show="isWrongAnswer" style="font-size: 12rem; color: red; text-align: center;">錯誤答案</p>
        </div>
        <button id="submit-button" @click="sumbitAnswer">發送</button>
        <div id="submit-button-under-line"></div>
        <div id="get-reward-section" v-show="isShowGetReward">
            <img src="../../assets/xmark.png" alt="XMark" id="get-reward-back-button" @click="isShowGetReward=!isShowGetReward">
            <div style="display: flex;">
                <img src="../../assets/earnMoney/party.png" alt="" style="height: 15rem; width: 15rem;">
                <p style="font-size: 12rem;">恭喜完成所有題目</p>
            </div>
            <button id="get-reward-button" @click="getReward">領取獎勵</button>
        </div>
        <div class="blur-background" v-show="isShowGetReward"></div>
        <message-success-view :isShow="isGettingReward" message="獲取獎勵中"></message-success-view>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue'
import { useEthersStore } from '../../pinia/useEthersStore'
import { getAllowanceERC20SmartContractWrtie, parseToUint256 } from '../../manager/ethersManager'
import messageSuccessView from '../common/messageSuccessBarView.vue'

const ethersStore = useEthersStore()
const firstNumber = ref(0)
const secondNumber = ref(0)
const answer = ref(0)
const currentQuestionCount = ref(1)
const isWrongAnswer = ref(false)
const isShowGetReward = ref(false)
const isGettingReward = ref(false)

// 獲取新題目
function getQuestion() {
    firstNumber.value = Math.floor(Math.random() * 100)
    secondNumber.value = Math.floor(Math.random() * 100)
}

// 點擊提交答案後觸發
function sumbitAnswer() {
    isWrongAnswer.value = false
    if (answer.value != (firstNumber.value + secondNumber.value)) {
        isWrongAnswer.value = true
        return
    }
    if (currentQuestionCount.value != 10) {
        // 尚未完成所有題目
        getQuestion()
        currentQuestionCount.value += 1
        answer.value = 0
    } else {
        // 完成所有題目
        isShowGetReward.value = true
        getQuestion()
        currentQuestionCount.value = 1
        answer.value = 0
    }
}

// 獲取獎勵
async function getReward() {
    const provider = toRaw(ethersStore.data.provider)
    const signer = provider.getSigner()
    const writeAbleContract = getAllowanceERC20SmartContractWrtie(signer)
    const amount = parseToUint256(100)
    const transaction = await writeAbleContract.reward(amount)
    isGettingReward.value = true
    const transactionResult = await transaction.wait()
    isGettingReward.value = false
    if (transactionResult.status != 1) {
        isShowGetReward.value = true
    } else {
        isShowGetReward.value = false
    }
}

onMounted(() => {
    getQuestion()
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
#top-info {
    font-size: 15em;
    margin-top: 30rem;
}
#question-count-section {
    position: absolute;
    right: 50rem;
    top: 55rem;
    display: flex;
}
#question {
    display: flex;
    flex-direction: row;
    margin-top: 15rem;
}
#question p {
    font-size: 20rem;
    margin: 0rem 50rem;
    line-height: 18rem;
}
#question img {
    height: 15rem;
    width: 15rem;
}
#answer {
    display: flex;
    flex-direction: column;
    margin-top: 20rem;
}
#answer img {
    position: absolute;
    height: 15rem;
    width: 15rem;
    margin-top: 7rem;
    margin-right: 5rem;
    transform: translateX(-30rem);
}
#answer-input-box {
    all: unset;
    font-size: 20rem;
    text-align: center;
    line-height: 20rem;
    width: 100rem;
}
#answer-under-line {
    height: 1rem;
    width: 100rem;
    margin-top: -8rem;
    border-bottom: solid 1rem #9be6fc;
}
.wrong-answer-under-line {
    border-bottom: solid 1rem red !important;
    animation: shake 0.5s 1 !important;
}
#submit-button {
    all: unset;
    margin-top: 30rem;
    font-size: 12rem;
    background-color: #FFD966;
    padding: 2rem 20rem;
    border-radius: 3rem;
    animation: submit-button-animation 0.5s ease-in-out alternate infinite;
}
@keyframes submit-button-animation {
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(5rem);
        box-shadow: 0px 1rem 10px 3px rgb(0, 0, 0, 0.5);
    }
}
#submit-button:hover {
    cursor: pointer;
}
#submit-button-under-line {
    transform: translateY(9rem);
    animation: submit-button-under-line-animation 0.5s ease-in-out alternate infinite;
}
@keyframes submit-button-under-line-animation {
    from {
        border-bottom: solid 1rem #FFD966;
        width: 20rem;
    }
    to {
        border-bottom: solid 1rem #FFD966;
        width: 80rem;
    }
}
#get-reward-section {
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.5);
    padding: 5rem 12rem;
    border-radius: 3rem;
    backdrop-filter: blur(5px);
    z-index: 999;
}
#get-reward-back-button {
    height: 5rem;
    width: 5rem;
    margin-left: auto;
    margin-right: -7rem;
}
#get-reward-back-button:hover {
    cursor: pointer;
}
#get-reward-button {
    all: unset;
    margin: 0 auto;
    margin-top: 15rem;
    font-size: 10rem;
    background-color: #9be6fc;
    padding: 3rem 12rem;
    border-radius: 3rem;
    box-shadow: 0px 0px 10px 2px rgb(0, 0, 0, 0.5);
}
#get-reward-button:hover {
    cursor: pointer;
}
</style>