<template>
    <div id="top-style">
        <div id="search-bar">
            <input type="text" id="search-input" placeholder="搜尋" v-model="search">
            <img src="../../../assets/loan/search2.png" alt="Search" id="search-img">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search = ref("")
</script>

<style scoped>
#top-style {
    display: flex;
    flex-direction: column;
}
#search-bar {
    display: flex;
    width: 60vw;
    height: 7vh;
    background-color: #efedec;
    border-radius: 5rem;
}
#search-input {
    all: unset;
    margin: 2rem 2rem;
    width: 82%;
    height: 70%;
    border: solid 0.5rem #DCDCDC;
    background-color: white;
    margin: auto 3rem;
    font-size: 8rem;
    padding: 0px 5rem;
    border-radius: 5rem;
    animation: scale-animation 0.5s cubic-bezier(.45,.56,.4,1.32) forwards;
}
#search-img {
    height: 8rem;
    width: 8rem;
    margin: auto 0;
    background-color: #e77f3a;
    padding: 3.5rem 3.5rem;
    border-radius: 5rem;
    animation: scale-animation 0.5s cubic-bezier(.45,.56,.4,1.32) forwards;
}
#search-img:hover {
    cursor: pointer;
}
@keyframes scale-animation {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}
</style>