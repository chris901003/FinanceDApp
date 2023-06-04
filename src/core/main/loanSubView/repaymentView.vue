<template>
    <div id="top-style">
        <div id="filter-section">
            <div class="filter-section-container" @click="selectFilter('money')">
                <p :class="{'filter-section-background': true, 'filter-section-selected-background': filterSelection['money']}"></p>
                <div class="filter-section-box">
                    <img class="filter-section-img" src="../../../assets/loan/amount.png" alt="Amount">
                    <p class="filter-section-info">金額</p>
                </div>
            </div>
            <div class="filter-section-container" @click="selectFilter('repayTime')">
                <p :class="{'filter-section-background': true, 'filter-section-selected-background': filterSelection['repayTime']}"></p>
                <div class="filter-section-box">
                    <img class="filter-section-img" src="../../../assets/loan/time.png" alt="Time">
                    <p class="filter-section-info">時間</p>
                </div>
            </div>
            <div :class="{'filter-section-container': true, 'filter-sort-img-reverse': isReverseShow}" @click="reverseShow">
                <img id="filter-sort-img" src="../../../assets/loan/double-arrow.png" alt="Sort">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const filterSelection = reactive({
    money: false,
    repayTime: false
})
const isReverseShow = ref(false)

// 更新頁面中有選到的過濾器
function selectFilter(target: string) {
    if (!(target == "money" || target == "repayTime")) {
        return
    }
    if (target == "money") {
        filterSelection["repayTime"] = false
    } else if (target == "repayTime") {
        filterSelection["money"] = false
    }
    filterSelection[target] = !filterSelection[target]
    filterShow()
}

// 根據目前選擇的過濾器進行過濾
function filterShow() {

}

// 翻轉展示畫面順序
function reverseShow() {
    isReverseShow.value = !isReverseShow.value
}

console.log(filterSelection["money"])
</script>

<style scoped>
#top-style {
    display: flex;
    flex-direction: column;
}
#filter-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
}
.filter-section-box {
    display: flex;
    position: sticky;
    transform: translateY(-15rem);
}
.filter-section-container {
    text-align: center;
    margin-left: 5rem;
}
.filter-section-container:hover {
    cursor: pointer;
}
.filter-section-img {
    width: 10rem;
    height: 10rem;
    transform: translateX(-2rem) translateY(-2rem);
}
.filter-section-info {
    font-size: 10rem;
    line-height: 17rem;
    transform: translateX(-2rem);
}
.filter-section-background {
    width: 30rem;
    height: 13rem;
    background-color: rgb(255, 255, 255, 0.6);
    border: solid 0.5rem rgb(0, 0, 0, 0.8);
    border-radius: 3rem;
    transition: all 0.2s linear;
}
.filter-section-selected-background {
    background-color: #8FE3CF;
    box-shadow: 0px 0px 10px 2px rgb(0, 0, 0, 0.2);
}
#filter-sort-img {
    height: 8rem;
    width: 8rem;
    background-color: #85f3ff;
    padding: 3rem 3rem;
    border-radius: 10rem;
    transform: rotate(-90deg);
}
.filter-sort-img-reverse {
    transform: rotate(180deg) translateY(16.5rem);
}
</style>