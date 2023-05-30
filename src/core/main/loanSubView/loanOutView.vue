<template>
    <div id="top-style">
        <div style="display: flex; align-items: center;">
            <div id="top-search-bar">
                <img src="../../../assets/loan/search.png" alt="Search">
                <input type="text" id="search-input-box" v-model="searchInfo">
                <div>
                    <div id="send-button-container"></div>
                    <img src="../../../assets/loan/paper-plane.png" alt="Send" id="search-button">
                </div>
            </div>
            <div>
                <p id="add-loan-out-button" @click="isShowAddLoadSheet=!isShowAddLoadSheet">新增</p>
                <div id="add-loan-background1"></div>
                <div id="add-loan-background2"></div>
                <div id="add-loan-background3"></div>
            </div>
        </div>
        <div class="blur-background" v-show="isShowAddLoadSheet"></div>
        <Transition name="add-loan">
            <new-loan-out-sheet v-show="isShowAddLoadSheet" @closeSheet="isShowAddLoadSheet=!isShowAddLoadSheet"></new-loan-out-sheet>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import newLoanOutSheet from './loanOutSheetView.vue'

const searchInfo = ref("")
const isShowAddLoadSheet = ref(false)
</script>

<style scoped>
#top-style {
    display: flex;
    flex-direction: column;
}
#top-search-bar {
    display: flex;
    flex-direction: row;
    padding: 3rem 5rem;
    background-color: rgb(255, 255, 255, 0.5);
    border-radius: 8rem;
    align-items: center;
    width: 0vw;
    animation: top-search-bar-animation 0.7s linear forwards;
}
@keyframes top-search-bar-animation {
    from {
        width: 0rem;
    }
    to {
        width: 60vw;
    }
}
#top-search-bar img {
    width: 6rem; 
    height: 6rem;
    margin-right: 3rem;
    opacity: 0;
    animation: opacity-animation 0.5s linear forwards;
}
#top-search-bar img:hover {
    cursor: pointer;
}
#search-input-box {
    all: unset;
    font-size: 8rem;
    width: 100%;
}
#send-button-container {
    position: absolute;
    width: 23rem;
    height: 23rem;
    transform: translate(-6.5rem, -7rem);
    border-radius: 20rem;
    background-color: black;
    box-shadow: 0px 0px 3rem 0.8rem rgb(0, 0, 0, 0.5);
}
#send-button-container:hover {
    cursor: pointer;
}
#search-button {
    filter: invert(100%) saturate(0);
    width: 8rem !important;
    height: 8rem !important;
}
#add-loan-out-button {
    margin-left: 10rem;
    font-size: 8rem;
    background-color: black;
    color: white;
    padding: 2rem 10rem;
    border-radius: 3rem;
    opacity: 0;
    animation: add-loan-out-button-keep-animation 1s ease-in-out alternate infinite,
    opacity-animation 0.5s linear forwards;
    animation-delay: 1s;
}
@keyframes add-loan-out-button-keep-animation {
    from {
        transform: scale(0.85);
    }
    to {
        transform: scale(1);
    }
}
#add-loan-out-button:hover {
    cursor: pointer;
}
#add-loan-background1 {
    position: absolute;
    width: 24rem;
    height: 10rem;
    border: solid 0.5rem rgb(0, 0, 0, 0.3);
    border-radius: 2rem;
    opacity: 0;
    animation: add-load-background-aniamtion 2s linear infinite;
    animation-delay: 2s;
    pointer-events: none;
}
#add-loan-background2 {
    position: absolute;
    width: 24rem;
    height: 10rem;
    border: solid 0.5rem rgb(0, 0, 0, 0.3);
    border-radius: 2rem;
    opacity: 0;
    animation: add-load-background-aniamtion 2s linear infinite;
    animation-delay: 2.2s;
    pointer-events: none;
}
#add-loan-background3 {
    position: absolute;
    width: 24rem;
    height: 10rem;
    border: solid 0.5rem rgb(0, 0, 0, 0.3);
    border-radius: 2rem;
    opacity: 0;
    animation: add-load-background-aniamtion 2s linear infinite;
    animation-delay: 2.4s;
    pointer-events: none;
}
@keyframes add-load-background-aniamtion {
    0% {
        transform: translateX(13.5rem) translateY(-13rem) scale(0);
        opacity: 0;
    }
    40% {
        transform: translateX(13.5rem) translateY(-13rem) scale(1);
        opacity: 1;
    }
    80% {
        transform: translateX(13.5rem) translateY(-13rem) scale(2);
        opacity: 0;
    }
    100% {
        transform: translateX(13.5rem) translateY(-13rem) scale(2);
        opacity: 0;
    }
}
</style>