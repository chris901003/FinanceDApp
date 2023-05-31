<template>
    <div id="top-style">
        <img src="../../../assets/loan/loan.png" alt="Loan" style="height: 15rem; width: 15rem; margin-bottom: 3rem;">
        <p style="font-size: 10rem;">標題: {{ props.loanOutInfo.title }}</p>
        <p style="font-size: 10rem; margin-bottom: 3rem;">金額: {{ props.loanOutInfo.loanOutMoney }}</p>
        <p style="font-size: 8rem;">發布: {{ props.loanOutInfo.announcedDeadline }}</p>
        <p style="font-size: 8rem;">結束: {{ props.loanOutInfo.repaymentDeadline }}</p>
        <button id="remove-loan-out">撤銷貸款</button>
    </div>
</template>

<script setup lang="ts">

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
}
</style>