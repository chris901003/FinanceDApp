<template>
    <div class="main-background main-style">
        <Transition name="navigation">
            <div v-show="isShowNavigationSection" id="navigation-section">
                <navigation-view @showNavigationSection="isShowNavigationSection=!isShowNavigationSection"></navigation-view>
            </div>
        </Transition>
        <div>
            <top-bar-view @showNavigationSection="isShowNavigationSection=!isShowNavigationSection"></top-bar-view>
            <router-view></router-view>
        </div>
        <div class="blur-background" v-show="isShowNavigationSection"></div>
    </div>
</template>

<script setup lang="ts">
import { useEthersStore } from '../../pinia/useEthersStore'
import { getProvider, watchIsMetaMasStateChange } from '../../manager/ethersManager'
import { onMounted, ref } from 'vue'
import topBarView from './topBarView.vue'
import navigationView from './navigationView.vue'

const ethersStore = useEthersStore()
const isShowNavigationSection = ref(false)

// 監看是否有更換帳號或是斷開MetaMask連接
watchIsMetaMasStateChange()

onMounted(async () => {
    // 獲取Provider資料
    const provider = await getProvider()
    ethersStore.changeProvider(provider)
})
</script>

<style scoped>
#navigation-section {
    position: absolute;
    z-index: 100;
}

.navigation-enter-active,
.navigation-leave-active {
    transition: all 0.5s;
}
.navigation-enter-from,
.navigation-leave-to {
    transform: translateX(-100%);
}
.navigation-enter-to,
.navigation-leave-from {
    transform: translateX(0px);
}
</style>