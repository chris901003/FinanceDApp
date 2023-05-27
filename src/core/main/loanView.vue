<template>
    <div id="top-style">
        <div style="display: flex; margin-right: auto">
            <img src="../../assets/navigation/loan.png" alt="Loan" style="height: 15rem; width: 15rem">
            <p id="title-info">貸款</p>
        </div>
        <div id="loan-selection">
            <p id="loan-out" :class="{'selected-inner': selectedLoanOut, 'selected-leave': selectedLoanIn}" @click="changeSelect(true, false)">借出</p>
            <p id="loan-in" :class="{'selected-inner': selectedLoanIn, 'selected-leave': selectedLoanOut}" @click="changeSelect(false, true)">借款</p>
        </div>
        <div id="loan-selection-under-bar" :class="{'loan-out-bar': selectedLoanOut, 'loan-in-bar': selectedLoanIn}"></div>
        <div id="loan-view">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedLoanOut = ref(true)
const selectedLoanIn = ref(false)

// 更換選擇目標
function changeSelect(loanOut: boolean, loanIn: boolean) {
    selectedLoanOut.value = loanOut
    selectedLoanIn.value = loanIn
    if (loanOut) {
        router.push({
            path: '/main/loan/loan-out'
        })
    } else if(loanIn) {
        router.push({
            path: '/main/loan/loan-in'
        })
    }
}
</script>

<style scoped>
#top-style {
    margin: 0rem 20rem;
    display: flex;
    flex-direction: column;
}
#title-info {
    font-size: 18rem;
    line-height: 16rem;
    margin-left: 3rem;
}
#loan-selection {
    display: flex;
    flex-direction: row;
    margin-top: 5rem;
    margin-left: 15rem;
}
#loan-out {
    font-size:12rem;
    padding: 0rem 5rem;
    margin-right: 5rem;
}
#loan-in {
    font-size: 12rem;
    padding: 0rem 5rem;
}
#loan-in:hover, #loan-out:hover {
    cursor: pointer;
}
.selected-inner {
    border-radius: 2rem;
    animation: select-inner-background-animation 0.4s linear forwards;
}
.selected-leave {
    border-radius: 2rem;
    animation: select-leave-background-animation 0.4s linear forwards;
}
@keyframes select-inner-background-animation {
    from {
        background-color: rgb(255, 255, 255, 0);
    }
    to {
        background-color: rgb(255, 255, 255, 0.3);
    }
}
@keyframes select-leave-background-animation {
    from {
        background-color: rgb(255, 255, 255, 0.3);
    }
    to {
        background-color: rgb(255, 255, 255, 0);
    }
}
#loan-selection-under-bar {
    margin-left: 22rem;
    margin-top: -4rem;
    width: 14rem;
    height: 1rem;
    border-bottom: solid 1rem rgb(0, 0, 0);
}
.loan-out-bar {
    transform: translateX(0px);
    transition: all 0.2s linear;
}
.loan-in-bar {
    transform: translateX(33rem);
    transition: all 0.2s linear;
}
#loan-view {
    margin-top: 10rem;
}
</style>