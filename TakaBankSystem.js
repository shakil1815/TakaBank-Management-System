let accounts = [];

function showOutput(message, isError = false) {
    const outputBox = document.getElementById('outputBox');
    
    // মেসেজের ধরন অনুযায়ী আইকন পরিবর্তন
    let icon = isError ? '<i class="fa-solid fa-triangle-exclamation" style="color: #ef4444;"></i>' : '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i>';
    
    outputBox.innerHTML = `${icon} <div>${message}</div>`;
    
    // হাইলাইট করার জন্য এনিমেশন ইফেক্ট
    outputBox.style.transform = "scale(1.02)";
    setTimeout(() => {
        outputBox.style.transform = "scale(1)";
    }, 200);
}

function createAccount() {
    let accNum = parseInt(document.getElementById('createAccNum').value);
    let name = document.getElementById('createName').value;
    let initialBalance = parseFloat(document.getElementById('createBalance').value);

    if (isNaN(accNum) || name.trim() === "" || isNaN(initialBalance) || initialBalance < 0) {
        showOutput("Please enter valid details to create an account.", true);
        return;
    }

    let exists = accounts.find(acc => acc.accountNumber === accNum);
    if (exists) {
        showOutput("Account number already exists! Try a different one.", true);
        return;
    }

    let newAccount = {
        accountNumber: accNum,
        accountHolderName: name,
        balance: initialBalance
    };

    accounts.push(newAccount);
    showOutput(`<strong>Account Created Successfully!</strong><br>Name: ${name} <br>A/C No: ${accNum} <br>Balance: ${initialBalance.toFixed(2)} BDT`);
    
    document.getElementById('createAccNum').value = '';
    document.getElementById('createName').value = '';
    document.getElementById('createBalance').value = '';
}

function transaction(type) {
    let accNum = parseInt(document.getElementById('transAccNum').value);
    let amount = parseFloat(document.getElementById('transAmount').value);

    if (isNaN(accNum) || isNaN(amount) || amount <= 0) {
        showOutput("Invalid Account Number or Amount!", true);
        return;
    }

    let account = accounts.find(acc => acc.accountNumber === accNum);

    if (account) {
        if (type === 'deposit') {
            account.balance += amount;
            showOutput(`<strong>Deposit Successful!</strong><br>A/C No: ${accNum} <br>Deposited: ${amount.toFixed(2)} BDT <br>New Balance: ${account.balance.toFixed(2)} BDT`);
        } else if (type === 'withdraw') {
            if (amount <= account.balance) {
                account.balance -= amount;
                showOutput(`<strong>Withdrawal Successful!</strong><br>A/C No: ${accNum} <br>Withdrawn: ${amount.toFixed(2)} BDT <br>Remaining Balance: ${account.balance.toFixed(2)} BDT`);
            } else {
                showOutput(`<strong>Insufficient Balance!</strong><br>Cannot withdraw ${amount.toFixed(2)} BDT.`, true);
            }
        }
        document.getElementById('transAmount').value = ''; // শুধু অ্যামাউন্ট ক্লিয়ার হবে
    } else {
        showOutput("Account not found! Please check the Account Number.", true);
    }
}

function displayAccount() {
    let accNum = parseInt(document.getElementById('dispAccNum').value);

    if (isNaN(accNum)) {
        showOutput("Please enter a valid Account Number.", true);
        return;
    }

    let account = accounts.find(acc => acc.accountNumber === accNum);

    if (account) {
        showOutput(`<strong>--- Account Details ---</strong><br>Account Number: ${account.accountNumber}<br>Account Holder: ${account.accountHolderName}<br>Current Balance: <strong>${account.balance.toFixed(2)} BDT</strong>`);
    } else {
        showOutput("Account not found! Please check the Account Number.", true);
    }
}
