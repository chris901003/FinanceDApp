<template>
    <div id="top-style">
        <img src="../../assets/metamask.png" alt="MetaMask" id="metamask-icon">
        <p id="info">MetaMask</p>
        <p id="link-metamask" @click="linkToMetamask">連結MetaMask</p>
        <p id="reject-metamask-link" v-show="isShowReject">您拒絕本服務連結MetaMask，請重新連結MetaMask</p>
    </div>
</template>

<script setup lang="ts">
import { getProvider } from '../../manager/ethersManager'
import { useEthersStore } from '../../pinia/useEthersStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const ethersStore = useEthersStore()
const router = useRouter()
const isShowReject = ref(false)

// 與MetaMask進行連結
async function linkToMetamask() {
    try {
        const provider = await getProvider()
        ethersStore.changeProvider(provider)
        isShowReject.value = false
        router.push({
            path: '/main'
        })
    } catch {
        isShowReject.value = true
    }
}

</script>

<style scoped>
#top-style {
    display: flex;
    flex-direction: column;
}
#metamask-icon {
    margin: 0 auto;
    width: 50rem;
    height: 50rem;
    margin-top: 15rem;
}
#info {
    margin: 0 auto;
    font-size: 35rem;
}
#link-metamask {
    margin: 0 auto;
    font-size: 15rem;
    background-color: #12b9e6;
    padding: 2rem 10rem;
    border-radius: 5rem;
    box-shadow: 0px 0px 5px 2px rgb(0, 0, 0, 0.5);
    animation: link-metamask-animation 0.5s alternate infinite;
}
@keyframes link-metamask-animation {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.2);
    }
}
#link-metamask:hover {
    cursor: pointer;
}
#reject-metamask-link {
    margin: 0 auto;
    margin-top: 20rem;
    font-size: 10rem;
    color: red;
}
</style>