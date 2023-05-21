<template>
    <div id="top-style">
        <div class="one-line-style">
            <img id="title-img" src="../../assets/wallet.png" alt="Wallet">
            <p id="title-info">Finance DApp</p>
        </div>
        <img id="seperate-line" src="../../assets/navigation/seperate-line.png" alt="分隔線">
        <div class="one-line-style options">
            <img src="../../assets/navigation/news.png" alt="News">
            <p>最新資訊</p>
        </div>
        <div class="one-line-style options">
            <img src="../../assets/navigation/deposit.png" alt="Deposit">
            <p>存款</p>
        </div>
        <div class="one-line-style options">
            <img src="../../assets/navigation/withdraw.png" alt="Withdraw">
            <p>提款</p>
        </div>
        <div class="one-line-style options">
            <img src="../../assets/navigation/loan.png" alt="Loan">
            <p>貸款</p>
        </div>
        <div class="one-line-style options">
            <img src="../../assets/navigation/house.png" alt="House">
            <p>總覽</p>
        </div>
        <button @click="emits('showNavigationSection')">點我</button>
    </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emits = defineEmits<{
    (e: 'showNavigationSection'): void
}>()
</script>

<style scoped>
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
    margin-bottom: 3rem;
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
</style>