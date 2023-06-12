<template>
    <div id="top-style">
        <div style="display: flex;" id="home-title">
            <img src="../../assets/navigation/house.png" alt="House">
            <p>總覽</p>
        </div>
        <div class="info-container" style="animation-delay: 0.1s;">
            <img src="../../assets/home/hand-money.png" alt="手上的錢">
            <p>手上持有: {{ handMoney }} $</p>
        </div>
        <div class="info-container" style="animation-delay: 0.3s;">
            <img src="../../assets/home/bank-money.png" alt="銀行的錢">
            <p>銀行持有: {{ bankMoney }} $</p>
        </div>
        <div class="info-container" style="animation-delay: 0.5s;">
            <img src="../../assets/home/loan-out.png" alt="借出金額">
            <p>借出金額: {{ loanOutMoney }} $</p>
        </div>
        <div class="info-container" style="animation-delay: 0.7s;">
            <img src="../../assets/home/loan-in.png" alt="貸款金額">
            <p>貸款金額: {{ loanInMoney }} $</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue'
import { getProvider, getFinacialContractRead, bigNumberFormat } from '../../manager/ethersManager'
import { useEthersStore } from '../../pinia/useEthersStore'

const handMoney = ref(0)
const bankMoney = ref(0)
const loanOutMoney = ref(0)
const loanInMoney = ref(0)
const ethersStore = useEthersStore()

onMounted(async () => {
    const currentProvider = await getProvider()
    await ethersStore.changeProvider(currentProvider)
    const provider = toRaw(ethersStore.data.provider)
    const address = ethersStore.data.address
    const readOnlyContract = getFinacialContractRead(provider)

    handMoney.value = bigNumberFormat(await readOnlyContract.handAmount(address)) * 1e18
    bankMoney.value = bigNumberFormat(await readOnlyContract.bankAmount(address)) * 1e18

    const allAnnounceLoan = await readOnlyContract.getMyLoanAnnounce(address)
    for (let i = 0; i < allAnnounceLoan.length; i++) {
        loanOutMoney.value += bigNumberFormat(allAnnounceLoan[i].loanAmount) * 1e18
    }
    const allApplyLoan = await readOnlyContract.getMyLoanApply(address)
    for (let i = 0; i < allApplyLoan.length; i++) {
        loanInMoney.value += bigNumberFormat(allApplyLoan[i].loanAmount) * 1e18
    }
})
</script>

<style scoped>
#top-style {
    display: flex;
    flex-direction: column;
}
#top-style {
    margin: 0rem 20rem;
}
#home-title img {
    width: 20rem;
    height: 20rem;
}
#home-title p {
    font-size: 18rem;
    margin-left: 3rem;
    line-height: 25rem;
}
.info-container {
    display: flex;
    flex-direction: row;
    margin-left: 20rem;
    margin-top: 15rem;
    opacity: 0;
    transform: translateX(-100%);
    animation: info-container-animation 0.5s linear forwards;
}
.info-container img {
    height: 15rem;
    width: 15rem;
}
.info-container p {
    font-size: 12rem;
    line-height: 15rem;
    margin-left: 5rem;
}
@keyframes info-container-animation {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0px);
        opacity: 1;
    }
}
</style>