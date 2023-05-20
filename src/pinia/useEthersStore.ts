import { defineStore } from 'pinia'

export const useEthersStore = defineStore('ethersStore', () => {
    let provider: Object = Object()

    // 更新Provider
    function changeProvider(newProvider: Object) {
        provider = newProvider
    }

    return {
        provider, changeProvider
    }
})