import { ethers } from 'ethers'
import { useRouter } from 'vue-router'

// 獲取MetaMask連結後的Provider
export async function getProvider() {
    const { ethereum } = window as any
    const provider = new ethers.providers.Web3Provider(ethereum)
    await provider.send("eth_requestAccounts", [])
    return provider
}

// 檢查是否還與MetaMask連接
export async function isConnectToMetaMask() {
    const { ethereum } = window as any
    const accounts = await ethereum.request({method: 'eth_accounts'})
    const connected = accounts && accounts.length > 0
    return connected
}

// 監看是否與MetaMask斷開連線
export function watchIsMetaMasStateChange() {
    const router = useRouter()
    const { ethereum } = window as any
    ethereum.on('accountsChanged', async () => {
        const isConnect = await isConnectToMetaMask()
        if (!isConnect) {
            sessionStorage.setItem('isConnectMetaMask', 'false')
            router.replace({
                path: '/metamask'
            })
        }
    })
}
