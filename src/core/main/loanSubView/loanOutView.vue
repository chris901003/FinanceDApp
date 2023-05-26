<template>
    <div id="top-style">
        <div id="top-search-bar">
            <img src="../../../assets/loan/search.png" alt="Search">
            <input type="text" id="search-input-box" v-model="searchInfo">
            <div>
                <div id="send-button-container"></div>
                <img src="../../../assets/loan/paper-plane.png" alt="Send" id="search-button">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchInfo = ref("")
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
    width: 60vw;
}
#top-search-bar img {
    width: 6rem; 
    height: 6rem;
    margin-right: 3rem;
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
}
#search-button {
    filter: invert(100%) saturate(0);
    width: 8rem !important;
    height: 8rem !important;
}
</style>