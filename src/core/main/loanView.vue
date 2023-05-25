<template>
    <div>
        <p style="font-size: 12rem; text-align: center;">Loan View</p>
        {{ currentAddress }}
    </div>
</template>

<script setup lang="ts">
import { useEthersStore } from '../../pinia/useEthersStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
const ethersStore = useEthersStore()
const { currentAddress } = storeToRefs(ethersStore)
watch(currentAddress, (newValue, oldValue) => {
    console.log("Change Address")
    console.log(newValue, oldValue)
})
// ethersStore.$subscribe(() => {
//     console.log("S")
// })
</script>