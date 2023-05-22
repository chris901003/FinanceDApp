import { BigNumber, ethers } from 'ethers'
import { useRouter } from 'vue-router'
import { useEthersStore } from '../pinia/useEthersStore'
import { erc20Abi, erc20SmartContractAddress } from '../smartContract/erc20DistributedBank'

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
    const ethersStore = useEthersStore()
    const { ethereum } = window as any
    ethereum.on('accountsChanged', async () => {
        const isConnect = await isConnectToMetaMask()
        if (!isConnect) {
            sessionStorage.setItem('isConnectMetaMask', 'false')
            router.replace({
                path: '/metamask'
            })
        } else {
            const provider = await getProvider()
            ethersStore.changeProvider(provider)
        }
    })
}

// 將BigNumber進行轉換
export function bigNumberFormat(bigNumber: BigNumber) {
    const res = parseFloat(ethers.utils.formatEther(bigNumber))
    return res
}

// 監聽目前區塊數量
export function watchBlocksNumber(provider: any, handler: (blockNumber: number)=>void) {
    provider.on('block', handler)
}

// 獲取只讀的ERC20智能合約
export function getBankERC20SmartContractRead(provider: any) {
    const contractDAI = new ethers.Contract(erc20SmartContractAddress, erc20Abi, provider)
    return contractDAI
}

export function getBankERC20SmartContractWrite(signer: any) {
    const contractDAI = new ethers.Contract(erc20SmartContractAddress, erc20Abi, signer)
    return contractDAI
}
