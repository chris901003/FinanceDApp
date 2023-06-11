// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "./DateTime.sol";

contract FinicialContract {
    struct loan {
        uint256 id;
        address loaner;
        address borrower;
        uint256 loanAmount;
        uint256 loanInterset;
        uint256 expireYear;
        uint256 expireMonth; 
        uint256 expireDay;
    }

    // 合約擁有者
    address private owner;
    // 代幣名稱
    string private _name = "Dog";
    // 代幣代號
    string private _symbol = "@D@";
    // 小數點控制
    uint8 private _decimals = 0;
    // 總發行量
    uint256 private _totalSupply = 0;
    // 存款利率
    uint8 private bankInterest;
    // 貸款公告
    loan[] private _loanAnnouncement;
    // 產生隨機數使用
    uint private nonce = 0;

    // 查看該地址的代幣數量
    // 手上的金額
    mapping(address => uint256) private _handMoney;
    // 銀行金額
    mapping(address => uint256) private _bankMoney;
    // 該地址發行的貸款
    mapping(address => loan[]) private _loanSender;
    // 該地址的借款
    mapping(address => loan[]) private _loanReceiver;

    constructor() {
        owner = msg.sender;
        bankInterest = 0;
    }

    // 獲取隨機數
    function generateRandomID(address userAddress) private returns (uint) {
        uint randomID = uint(keccak256(abi.encodePacked(block.timestamp, userAddress, nonce))) % 1000000;
        nonce++;
        return randomID;
    }

    // 獲取代幣名稱
    function name() public view returns (string memory) {
        return _name;
    }

    // 獲取代幣代號
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    // 獲取小數位數
    function decimals() public view returns (uint8) {
        return _decimals;
    }

    // 獲取總發行量
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    // 加總手上以及銀行的金額
    function balanceOf() public view returns (uint256 balanceOfAccount) {
        return _handMoney[msg.sender] + _bankMoney[msg.sender];
    }

    // 獲取手上的錢
    function handAmount() public view returns (uint256 balanceOfAccount) {
        return _handMoney[msg.sender];
    }

    // 獲取戶頭的錢
    function bankAmount() public view returns (uint256 balanceOfAccount) {
        return _bankMoney[msg.sender];
    }

    // 獲取合約擁有者
    function getOwner() public view returns (address ownerAddress) {
        return owner;
    }

    // 獲取利率
    function getBankInterst() public view returns (uint8 interest) {
        return bankInterest;
    }

    // 設定利率
    function setBankInterst(uint8 interest) public returns (bool success) {
        require(msg.sender == getOwner(), "Only for contract owner to modify");
        require(interest >= 0 && interest < 100);
        bankInterest = interest;
        return true;
    }

    // 存款
    function deposit(uint256 amount) public returns (bool success) {
        // 扣除手中的錢並且加到戶頭當中
        require(_handMoney[msg.sender] >= amount, "Not enough money to deposit.");
        _handMoney[msg.sender] -= amount;
        _bankMoney[msg.sender] += amount;
        return true;
    }

    // 提款
    function withdraw(uint256 amount) public returns (bool success) {
        // 扣除銀行的金額加到手中
        require(_bankMoney[msg.sender] >= amount, "Not enough money to widthdraw.");
        _bankMoney[msg.sender] -= amount;
        _handMoney[msg.sender] += amount;
        return true;
    }

    // 轉帳
    function transfer(address to, uint256 amount) public returns (bool success) {
        require(_bankMoney[msg.sender] >= amount, "Not enough money to transfer.");
        _bankMoney[msg.sender] -= amount;
        _bankMoney[to] += amount;
        return true;
    }

    // 發布貸款資訊
    function announceLoan(uint256 amount, uint256 interest, uint256 expireYear, uint256 expireMonth, uint256 expireDay) public returns (bool success) {
        require(_bankMoney[msg.sender] >= amount, "Not enough money to announce loan.");
        loan memory newLoan;
        newLoan.id = generateRandomID(msg.sender);
        newLoan.loaner = msg.sender;
        newLoan.borrower = address(0x00);
        newLoan.loanAmount = amount;
        newLoan.loanInterset = interest;
        newLoan.expireYear = expireYear;
        newLoan.expireMonth = expireMonth;
        newLoan.expireDay = expireDay;
        _loanAnnouncement.push(newLoan);
        _loanSender[msg.sender].push(newLoan);
        _bankMoney[msg.sender] -= amount;
        return true;
    }

    // 獲取所有可貸款資訊
    function getAllValidLoanAnnounce() public view returns (loan[] memory loanAnnounce) {
        uint validCount = 0;
        for (uint i = 0; i < _loanAnnouncement.length; i++) {
            if (_loanAnnouncement[i].borrower != address(0x00)) {
                continue;
            }
            validCount += 1;
        }
        loan[] memory results = new loan[](validCount);
        validCount = 0;
        for (uint i = 0; i < _loanAnnouncement.length; i++) {
            if (_loanAnnouncement[i].borrower != address(0x00)) {
                continue;
            }
            results[validCount] = _loanAnnouncement[i];
            validCount += 1;
        }
        return results;
    }

    // 獲取自己發布的貸款
    function getMyLoanAnnounce() public view returns (loan[] memory loanAnnounce) {
        return _loanSender[msg.sender];
    }

    // 移除自己發布的貸款
    function removeLoanAnnounce(uint256 loanId) public returns (bool success) {
        bool have = false;
        uint256 amount = 0;
        // 從總覽中移除
        for (uint i = 0; i < _loanAnnouncement.length; i++) {
            // 需檢查該貸款是否已有人借貸
            if (_loanAnnouncement[i].id == loanId && _loanAnnouncement[i].loaner == msg.sender && _loanAnnouncement[i].borrower == address(0x00)) {
                amount = _loanAnnouncement[i].loanAmount;
                _loanAnnouncement[i] = _loanAnnouncement[_loanAnnouncement.length - 1];
                _loanAnnouncement.pop();
                have = true;
                break;
            }
        }
        // 如果找不到符合的結果就回傳false
        if (!have) { return false; }
        // 移除個別的紀錄
        for (uint i = 0; i < _loanSender[msg.sender].length; i++) {
            if (_loanSender[msg.sender][i].id == loanId) {
                _loanSender[msg.sender][i] = _loanSender[msg.sender][_loanSender[msg.sender].length - 1];
                _loanSender[msg.sender].pop();
            }
        }
        // 將金錢放回銀行中
        _bankMoney[msg.sender] += amount;
        return true;
    }

    // 查詢所有貸款
    function getMyLoanApply() public view returns (loan[] memory loanApply) {
        return _loanReceiver[msg.sender];
    }

    // 申請貸款
    function applyLoan(uint256 loanId) public returns (bool success) {
        uint256 amount = 0;
        address senderAddress;
        for (uint i = 0; i < _loanAnnouncement.length; i++) {
            if (_loanAnnouncement[i].id != loanId) {
                continue;
            }
            _loanAnnouncement[i].borrower = msg.sender;
            _loanReceiver[msg.sender].push(_loanAnnouncement[i]);
            amount = _loanAnnouncement[i].loanAmount;
            senderAddress = _loanAnnouncement[i].loaner;
            break;
        }
        for (uint i = 0; i < _loanSender[senderAddress].length; i++) {
            if (_loanSender[senderAddress][i].id != loanId) {
                continue;
            }
            _loanSender[senderAddress][i].borrower = msg.sender;
            break;
        }
        _bankMoney[msg.sender] += amount;
        return true;
    }

    // 付清貸款
    function payLoanMoney(uint256 loanId) public returns(bool success) {
        uint256 amount;
        uint256 interset;
        address senderAddress;
        for (uint i = 0; i < _loanAnnouncement.length; i++) {
            if (_loanAnnouncement[i].id != loanId) {
                continue;
            }
            amount = _loanAnnouncement[i].loanAmount;
            interset = _loanAnnouncement[i].loanInterset;
            senderAddress = _loanAnnouncement[i].loaner;
            _loanAnnouncement[i] = _loanAnnouncement[_loanAnnouncement.length - 1];
            _loanAnnouncement.pop();
        }
        require(_bankMoney[msg.sender] >= amount * interset, "Not enough money to return money.");
        for (uint i = 0; i < _loanSender[senderAddress].length; i++) {
            if (_loanSender[senderAddress][i].id != loanId) {
                continue;
            }
            _loanSender[senderAddress][i] = _loanSender[senderAddress][_loanSender[senderAddress].length - 1];
            _loanSender[senderAddress].pop();
            break;
        }
        for (uint i = 0; i< _loanReceiver[msg.sender].length; i++) {
            if (_loanReceiver[msg.sender][i].id != loanId) {
                continue;
            }
            _loanReceiver[msg.sender][i] = _loanReceiver[msg.sender][_loanReceiver[msg.sender].length - 1];
            _loanReceiver[msg.sender].pop();
            break;
        }
        _bankMoney[msg.sender] -= amount * interset;
        _bankMoney[senderAddress] += amount * interset;
        return true;
    }

    // 獎勵
    function reward(uint256 amount) public returns (bool success) {
        _handMoney[msg.sender] += amount;
        return true;
    }
}
