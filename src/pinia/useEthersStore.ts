import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useEthersStore = defineStore('ethersStore', () => {
    const data = reactive({
        provider: Object(),
        address: ref("")
    })
    const currentAddress = ref("")

    // 更新Provider
    async function changeProvider(newProvider: Object) {
        data.provider = newProvider
        sessionStorage.setItem('isConnectMetaMask', 'true')
        await updateAddress()
    }

    // 獲取錢包地址
    async function updateAddress() {
        const accounts = await data.provider.listAccounts()
        data.address = accounts[0]
        currentAddress.value = accounts[0]
    }

    return {
        data, changeProvider, currentAddress, updateAddress
    }
})