const finacialContractAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "interest",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "announceYear",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "announceMonth",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "announceDay",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expireYear",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expireMonth",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expireDay",
				"type": "uint256"
			}
		],
		"name": "announceLoan",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			}
		],
		"name": "applyLoan",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			}
		],
		"name": "payLoanMoney",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanId",
				"type": "uint256"
			}
		],
		"name": "removeLoanAnnounce",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "reward",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "interest",
				"type": "uint8"
			}
		],
		"name": "setBankInterst",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balanceOfAccount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "bankAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balanceOfAccount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllValidLoanAnnounce",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "loaner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "borrower",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "loanAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "loanInterset",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "announceYear",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "announceMonth",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "announceDay",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expireYear",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expireMonth",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expireDay",
						"type": "uint256"
					}
				],
				"internalType": "struct FinicialContract.loan[]",
				"name": "loanAnnounce",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBankInterst",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "interest",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getMyLoanAnnounce",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "loaner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "borrower",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "loanAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "loanInterset",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "announceYear",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "announceMonth",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "announceDay",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expireYear",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expireMonth",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expireDay",
						"type": "uint256"
					}
				],
				"internalType": "struct FinicialContract.loan[]",
				"name": "loanAnnounce",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getMyLoanApply",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "loaner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "borrower",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "loanAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "loanInterset",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "announceYear",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "announceMonth",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "announceDay",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expireYear",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expireMonth",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expireDay",
						"type": "uint256"
					}
				],
				"internalType": "struct FinicialContract.loan[]",
				"name": "loanApply",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "ownerAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "handAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balanceOfAccount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const finacialContractAddress = "0x5d0eAE1D2706D646d3dc9c3b181594734FcA71D2"

export {
    finacialContractAbi, finacialContractAddress
}