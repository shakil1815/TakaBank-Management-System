let accounts = [];

function showOutput(message) {
    document.getElementById('outputBox').innerText = message;
}

function createAccount() {
    let accNum = parseInt(document.getElementById('createAccNum').value);
    let name = document.getElementById('createName').value;
    let initialBalance = parseFloat(document.getElementById('createBalance').value);

    if (isNaN(accNum) || name.trim() === "" || isNaN(initialBalance) || initialBalance < 0) {
        showOutput("Please enter valid details to create an account.");
        return;
    }

    let newAccount = {
        accountNumber: accNum,
        accountHolderName: name,
        balance: initialBalance
    };

    accounts.push(newAccount);
    showOutput(`Account created successfully for ${name}!\nAccount No: ${accNum}\nBalance: ${initialBalance.toFixed(2)} BDT`);
    
    document.getElementById('createAccNum').value = '';
    document.getElementById('createName').value = '';
    document.getElementById('createBalance').value = '';
}

function transaction(type) {
    let accNum = parseInt(document.getElementById('transAccNum').value);
    let amount = parseFloat(document.getElementById('transAmount').value);

    if (isNaN(accNum) || isNaN(amount) || amount <= 0) {
        showOutput("Invalid Account Number or Amount!");
        return;
    }

    let account = accounts.find(acc => acc.accountNumber === accNum);

    if (account) {
        if (type === 'deposit') {
            account.balance += amount;
            showOutput(`Deposit successful!\nNew Balance: ${account.balance.toFixed(2)} BDT`);
        } else if (type === 'withdraw') {
            if (amount <= account.balance) {
                account.balance -= amount;
                showOutput(`Withdrawal successful!\nRemaining Balance: ${account.balance.toFixed(2)} BDT`);
            } else {
                showOutput(`Insufficient Balance!\nCannot withdraw ${amount.toFixed(2)} BDT.`);
            }
        }
    } else {
        showOutput("Account not found!");
    }
}

function displayAccount() {
    let accNum = parseInt(document.getElementById('dispAccNum').value);

    if (isNaN(accNum)) {
        showOutput("Please enter a valid Account Number.");
        return;
    }

    let account = accounts.find(acc => acc.accountNumber === accNum);

    if (account) {
        showOutput(`--- Account Details ---\nAccount Number: ${account.accountNumber}\nHolder Name: ${account.accountHolderName}\nBalance: ${account.balance.toFixed(2)} BDT`);
    } else {
        showOutput("Account not found!");
    }
}

