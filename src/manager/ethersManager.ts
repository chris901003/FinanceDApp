import { ethers } from 'ethers'

// 獲取MetaMask連結後的Provider
export async function getProvider() {
    const { ethereum } = window as any
    const provider = new ethers.providers.Web3Provider(ethereum)
    await provider.send("eth_requestAccounts", [])
    return provider
}
