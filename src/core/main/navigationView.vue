<template>
    <div id="top-style">
        <div id="back-button">
            <img src="../../assets/xmark.png" alt="xmark" @click="emits('showNavigationSection')">
        </div>
        <div class="one-line-style">
            <img id="title-img" src="../../assets/wallet.png" alt="Wallet">
            <p id="title-info">Finance DApp</p>
        </div>
        <img id="seperate-line" src="../../assets/navigation/seperate-line.png" alt="分隔線">
        <div class="one-line-style options" id="news" @click="navigateTo('/main/new-info')">
            <img src="../../assets/navigation/news.png" alt="News">
            <p>最新資訊</p>
        </div>
        <div class="one-line-style options" id="earn-money" @click="navigateTo('/main/earn-money')">
            <img src="../../assets/navigation/earn-money.png" alt="EarnMoney">
            <p>賺錢</p>
        </div>
        <div class="one-line-style options" id="deposit" @click="navigateTo('/main/deposit')">
            <img src="../../assets/navigation/deposit.png" alt="Deposit">
            <p>存款</p>
        </div>
        <div class="one-line-style options" id="withdraw" @click="navigateTo('/main/withdraw')">
            <img src="../../assets/navigation/withdraw.png" alt="Withdraw">
            <p>提款</p>
        </div>
        <div class="one-line-style options" id="transfer" @click="navigateTo('/main/transfer')">
            <img src="../../assets/navigation/transfer.png" alt="Transfer">
            <p>轉帳</p>
        </div>
        <div class="one-line-style options" id="loan" @click="navigateTo('/main/loan')">
            <img src="../../assets/navigation/loan.png" alt="Loan">
            <p>貸款</p>
        </div>
        <div class="one-line-style options" id="house" @click="navigateTo('/main/overview')">
            <img src="../../assets/navigation/house.png" alt="House">
            <p>總覽</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emits = defineEmits<{
    (e: 'showNavigationSection'): void
}>()

// 關閉導航
function closeNavigation() {
    emits('showNavigationSection')
}

// 跳轉到指定路徑
function navigateTo(url: string) {
    closeNavigation()
    router.push({
        path: url
    })
}
</script>

<style scoped>
#back-button {
    position: absolute;
    right: 3rem;
}
#back-button img {
    height: 5rem;
    width: 5rem;
}
#back-button img:hover {
    cursor: pointer;
}
#top-style {
    width: 80rem;
    height: 100vh;
    background-color: white;
    box-shadow: 0px 0px 10px 10px rgb(0, 0, 0, 0.5);
    padding-left: 5rem;
    padding-top: 5rem;
}
.one-line-style {
    display: flex;
    flex-direction: row;
}
#title-img {
    height: 12rem;
    width: 12rem;
}
#title-info {
    font-size: 12rem;
}
#seperate-line {
    width: 100%;
    margin-bottom: 5rem;
}
.options {
    transform: translateX(-100%);
    margin-bottom: 3rem;
    padding-left: 3rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    transition: all 0.2s;
}
.options img {
    height: 12rem;
    width: 12rem;
}
.options p {
    line-height: 15rem;
    font-size: 12rem;
    margin-left: 5rem;
}
.options:hover {
    cursor: pointer;
    background-color: #f1f0fe;
    border-left: solid 1rem #9b89fa;
    border-radius: 1rem;
    color: #9b89fa;
}
@keyframes left-to-right-position {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}
#news {
    animation: left-to-right-position 0.7s cubic-bezier(.45,.56,.4,1.32) forwards;
    animation-delay: 0.5s;
}
#earn-money {
    animation: left-to-right-position 0.7s cubic-bezier(.45,.56,.4,1.32) forwards;
    animation-delay: 0.7s;
}
#deposit {
    animation: left-to-right-position 0.7s cubic-bezier(.45,.56,.4,1.32) forwards;
    animation-delay: 0.9s;
}
#withdraw {
    animation: left-to-right-position 0.7s cubic-bezier(.45,.56,.4,1.32) forwards;
    animation-delay: 1.1s;
}
#transfer {
    animation: left-to-right-position 0.7s cubic-bezier(.45,.56,.4,1.32) forwards;
    animation-delay: 1.3s;
}
#loan {
    animation: left-to-right-position 0.7s cubic-bezier(.45,.56,.4,1.32) forwards;
    animation-delay: 1.5s;
}
#house {
    animation: left-to-right-position 0.7s cubic-bezier(.45,.56,.4,1.32) forwards;
    animation-delay: 1.7s;
}
</style>