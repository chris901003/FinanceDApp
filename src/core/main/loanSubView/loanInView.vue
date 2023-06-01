<template>
    <div id="top-style">
        <div style="display: flex; width: 83vw">
            <div id="search-bar">
                <input type="text" id="search-input" placeholder="搜尋" v-model="search">
                <img src="../../../assets/loan/search2.png" alt="Search" id="search-img">
            </div>
            <div style="display: flex; flex-direction: column;">
                <div style="margin-left: 5rem; margin-top: -6rem; display: flex; flex-direction: row;">
                    <div style="font-size: 8rem;">Filter</div>
                    <img src="../../../assets/loan/filter.png" alt="" style="width: 4rem; height: 4rem; margin-top: 2.5rem; margin-left: 2rem">
                </div>
                <div id="filter-section">
                    <div class="filter-box-container">
                        <div class="filter-box-background"></div>
                        <p class="filter-box-style">金額</p>
                    </div>
                    <div class="filter-box-container">
                        <div class="filter-box-background"></div>
                        <P class="filter-box-style">利息</P>
                    </div>
                    <div class="filter-box-container">
                        <div class="filter-box-background"></div>
                        <p class="filter-box-style">時間</p>
                    </div>
                    <img src="../../../assets/loan/double-arrow.png" alt="AES OR DES" id="filter-order-button">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search = ref("")
</script>

<style scoped>
#filter-order-button {
    height: 8rem;
    width: 8rem;
    margin-left: 10rem;
    background-color: #85F4FF;
    padding: 3rem;
    border-radius: 13rem;
    margin-bottom: 3rem;
    transform: rotate(-90deg);
}
#filter-order-button:hover {
    cursor: pointer;
}
.filter-box-container {
    width: 30rem;
    margin-left: 5rem;
    margin-bottom: 2.5rem;
}
.filter-box-style {
    position: sticky;
    font-size: 8rem;
    width: 25rem;
    margin: 0 auto;
    margin-top: -13rem;
    background-color: #ffffff;
    text-align: center;
    z-index: 2;
    border-radius: 3rem;
}
.filter-box-background {
    position: sticky;
    width: 30rem;
    height: 15rem;
    background-color: #efedec;
    z-index: 1;
    border-radius: 3rem;
}
#filter-section {
    display: flex;
    flex-direction: row;
    align-items: center;
}
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
    width: 76%;
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