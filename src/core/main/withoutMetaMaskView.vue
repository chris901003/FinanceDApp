<template>
    <div id="top-style">
        <img src="../../assets/metamask.png" alt="MetaMask" id="metamask-icon">
        <p id="title-info">MetaMask</p>
        <p class="info">本服務發現您未安裝MetaMask</p>
        <p class="info">若要使用此服務請先安裝，以下為安裝連結</p>
        <p id="metamask-link" @click="linkToMetaMaskWebsite">前往MetaMaske官網</p>
    </div>
</template>

<script setup lang="ts">
function linkToMetaMaskWebsite() {
    window.location.href = "https://metamask.io/"
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
}
#title-info {
    margin: 0 auto;
    font-size: 30rem;
    margin-bottom: 15rem;
}
.info {
    margin: 0 auto;
    font-size: 15rem;
}
#metamask-link {
    margin: 0 auto;
    margin-top: 20rem;
    font-size: 10rem;
    background-color: #12b9e6;
    padding: 3rem 12rem;
    border-radius: 5rem;
    box-shadow: 0px 0px 5px 2px rgb(0, 0, 0, 0.5);
    animation: metamask-link-scale 0.7s alternate infinite;
}
@keyframes metamask-link-scale {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.2);
    }
}
#metamask-link:hover {
    cursor: pointer;
}
</style>