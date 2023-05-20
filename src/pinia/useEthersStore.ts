import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useEthersStore = defineStore('ethersStore', () => {
    const data = reactive({
        provider: Object()
    })

    // 更新Provider
    function changeProvider(newProvider: Object) {
        data.provider = newProvider
        sessionStorage.setItem('isConnectMetaMask', 'true')
    }

    return {
        data, changeProvider
    }
})