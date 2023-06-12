<template>
    <div>
        <div id="top-style" :class="{'top-style-scale': isShowConfirm}">
            <img src="../../../assets/loan/contract.png" alt="Contract" style="height: 10rem; width: 10rem; margin-top: 3rem">
            <p style="font-size: 12rem">{{ props.loanInInfo.title }}</p>
            <p style="font-size: 8rem">借款金額: <span style="font-size: 8rem; text-decoration: underline;">{{ props.loanInInfo.loanOutMoney }}</span></p>
            <p style="font-size: 8rem">利率: {{ props.loanInInfo.intersetRate }}</p>
            <p style="font-size: 8rem">預計還款: {{ props.loanInInfo.loanOutMoney * props.loanInInfo.intersetRate }}</p>
            <p style="font-size: 8rem">還款日: {{ props.loanInInfo.repaymentDeadline }}</p>
            <button id="loan-in-button" @click="isShowConfirm = !isShowConfirm">借款</button>
        </div>
        <div id="blur-contract" v-show="isShowConfirm"></div>
        <div id="confirm-loan-section" v-show="isShowConfirm">
            <img src="../../../assets/loan/confirm-contract.png" alt="確認" style="height: 10rem; width: 10rem; margin-top: 5rem;">
            <p style="font-size: 12rem; text-decoration: underline; margin-top: 5rem">確定借款</p>
            <div id="confirm-loan-button">
                <img src="../../../assets/navigation/loan.png" alt="" style="height: 8rem; width: 8rem;">
                <button style="all: unset; font-size: 8rem;" @click="emits('loanIn', props.loanInInfo)">借款</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface loanOutInfoInterface {
    loanId: number,
    title: String,
    loanOutMoney: number,
    intersetRate: number,
    announcedDeadline: String,
    repaymentDeadline: String
}
const props = defineProps<{
    loanInInfo: loanOutInfoInterface
}>()
const emits = defineEmits<{
    (e: "loanIn", loanInfo: loanOutInfoInterface): void
}>()
const isShowConfirm = ref(false)
</script>

<style scoped>
#confirm-loan-button {
    margin-top: 20rem;
    background-color: #83d2fa;
    padding: 3rem 7rem;
    border-radius: 3rem;
    box-shadow: 0px 0px 5px 2px rgb(0, 0, 0, 0.2);
}
#confirm-loan-button:hover {
    cursor: pointer;
}
#confirm-loan-section {
    position: sticky;
    margin-top: -105rem;
    margin-left: 2.9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#blur-contract {
    position: sticky;
    margin-top: -105rem;
    margin-left: 2.9rem;
    border-radius: 5rem;
    transform: scale(1.1);
    backdrop-filter: blur(3rem);
    width: 60rem;
    height: 100rem;
}
#top-style {
    display: flex;
    flex-direction: column;
    width: 60rem;
    height: 100rem;
    margin: 3rem 5rem;
    align-items: center;
    background-color: rgb(255, 255, 255, 0.6);
    border-radius: 5rem;
    margin: 5rem 3rem;
    transition: all 0.2s linear;
}
#top-style:hover {
    transform: scale(1.1);
}
.top-style-scale {
    transform: scale(1.1);
}
#loan-in-button {
    all: unset;
    font-size: 8rem;
    margin-top: 3rem;
    background-color: #83d2fa;
    padding: 2rem 7rem;
    border-radius: 3rem;
    border: solid 1px rgb(0, 0, 0, 0.5);
}
#loan-in-button:hover {
    cursor: pointer;
    background-color: #7c99f8;
}
</style>