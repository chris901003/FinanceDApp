<template>
    <div id="top-style">
        <img src="../../../assets/loan/loan.png" alt="Loan" style="height: 15rem; width: 15rem; margin-bottom: 3rem;">
        <p style="font-size: 10rem;" :class="{'text-blur': isShowDeleteLoanOutWarngin}">標題: {{ props.loanOutInfo.title }}</p>
        <p style="font-size: 10rem; margin-bottom: 3rem;" :class="{'text-blur': isShowDeleteLoanOutWarngin}">金額: {{ props.loanOutInfo.loanOutMoney }}</p>
        <p style="font-size: 8rem;" :class="{'text-blur': isShowDeleteLoanOutWarngin}">發布: {{ props.loanOutInfo.announcedDeadline }}</p>
        <p style="font-size: 8rem;" :class="{'text-blur': isShowDeleteLoanOutWarngin}">結束: {{ props.loanOutInfo.repaymentDeadline }}</p>
        <button id="remove-loan-out" @click="isShowDeleteLoanOutWarngin=!isShowDeleteLoanOutWarngin">
            {{ isShowDeleteLoanOutWarngin ? "返回" : "撤銷貸款" }}
        </button>
        <div v-show="isShowDeleteLoanOutWarngin" id="delete-loan-out-warning">
            <p style="font-size: 12rem; font-weight: bold;">刪除</p>
            <button id="delete-button" @click="emits('deleteLoanOut', props.loanOutInfo)">確認刪除</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface loanOutInfoInterface {
    title: String,
    loanOutMoney: Number,
    intersetRate: Number,
    announcedDeadline: String,
    repaymentDeadline: String
}
const props = defineProps<{
    loanOutInfo: loanOutInfoInterface
}>()
const emits = defineEmits<{
    (e: "deleteLoanOut", loanOutInfo: loanOutInfoInterface): void
}>()
const isShowDeleteLoanOutWarngin = ref(false)
</script>

<style scoped>
#top-style {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60rem;
    height: 100rem;
    padding: 3rem 3rem;
    background-color: rgb(255, 255, 255, 0.5);
    border-radius: 5rem;
    box-shadow: 0rem 0rem 5rem 0.5rem rgb(0, 0, 0, 0.3);
    transition: all 0.3s linear;
}
#top-style:hover {
    transform: scale(1.1);
}
#remove-loan-out {
    all: unset;
    margin-top: 10rem;
    font-size: 8rem;
    background-color: deepskyblue;
    padding: 3rem 10rem;
    border-radius: 3rem;
    border: solid 0.3rem rgb(0, 0, 0, 0.3);
    box-shadow: 0px 0px 3px 1px rgb(0, 0, 0, 0.3);
}
#remove-loan-out:hover {
    cursor: pointer;
    background-color: #62CDFF;
}
.text-blur {
    filter: blur(10px);
    transition: all 0.2s linear;
}
#delete-loan-out-warning {
    position: relative;
    top: -75rem;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
#delete-button {
    all: unset;
    font-size: 10rem;
    margin-top: 5rem;
    background-color: red;
    padding: 1rem 5rem;
    color: white;
    border-radius: 3rem;
    transition: all 0.2s linear;
}
#delete-button:hover {
    cursor: pointer;
    transform: scale(1.1);
}
</style>