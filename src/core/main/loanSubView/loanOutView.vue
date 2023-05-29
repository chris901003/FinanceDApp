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
            <div id="add-loan-view" v-show="isShowAddLoadSheet">
                <img src="../../../assets/xmark.png" alt="xmark" style="margin-left: auto; height: 10rem; width: 10rem; margin-top: 5rem" 
                @click="isShowAddLoadSheet=!isShowAddLoadSheet">
                <h3>新增借貸</h3>
                <div class="row-flex" style="margin-top: 5rem">
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; flex-direction: row;">
                            <img src="../../../assets/loan/title.png" alt="Title" style="height: 12rem; width: 12rem">
                            <p style="font-size: 12rem; line-height: 13rem;">標題</p>
                        </div>
                    </div>
                    <input type="text" v-model="loanInfo.title" class="text-input-style">
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const searchInfo = ref("")
const isShowAddLoadSheet = ref(true)
const loanInfo = reactive({
    title: ""
})
</script>

<style scoped>
.row-flex {
    display: flex;
    justify-content: space-evenly;
    width: 80%;
}
.text-input-style {
    all: unset;
    font-size: 8rem;
    background-color: rgb(255, 255, 255, 0.8);
    border-radius: 1rem;
    padding-left: 1rem;
    box-sizing: border-box;
    /* border: solid 0.5rem rgb(0, 0, 0); */
}
.text-input-style:focus {
    animation: text-input-style-focus-animation 0.5s linear forwards;
}
@keyframes text-input-style-focus-animation {
    from {
        border: solid 0.5rem rgb(0, 0, 0, 0);
    }
    to {
        border: solid 0.5rem rgb(0, 0, 0, 1);
    }
}
</style>

<style scoped>
#add-loan-view {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 50vw;
    top: 15vh;
    transform: translate(-50%, 0%);
    z-index: 999;
    background-color: rgb(255, 255, 255, 0.5);
    width: 60vw;
    height: 65vh;
    overflow: auto;
    border-radius: 5rem;
    padding: 5rem 10rem;
}
#add-loan-view h3 {
    font-size: 15rem;
    margin-top: -10rem;
}
#add-loan-view img:hover {
    cursor: pointer;
}
.add-loan-enter-active, .add-loan-leave-active {
    transition: all 0.3s linear;
}
.add-loan-enter-from, .add-loan-leave-to {
    opacity: 0;
}
.add-loan-enter-to, .add-loan-leave-from {
    opacity: 1;
}
</style>

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