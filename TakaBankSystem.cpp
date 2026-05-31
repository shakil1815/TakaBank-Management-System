#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
using namespace std;
class BankAccount {
private:
    int accountNumber;
    string accountHolderName;
    double balance;

public:
    BankAccount(int accNum, string name, double initialBalance) {
        accountNumber = accNum;
        accountHolderName = name;
        balance = initialBalance;
    }

    int getAccountNumber() {
        return accountNumber;
    }

    double getBalance() {
        return balance;
    }

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "Deposit successful! Current Balance: " << fixed << setprecision(2) << balance << " BDT\n";
        } else {
            cout << "Invalid deposit amount!\n";
        }
    }

    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            cout << "Withdrawal successful! Remaining Balance: " << fixed << setprecision(2) << balance << " BDT\n";
        } else if (amount > balance) {
            cout << "Insufficient Balance! Cannot withdraw " << amount << " BDT.\n";
        } else {
            cout << "Invalid withdrawal amount!\n";
        }
    }

    void displayAccount() {
        cout << "\n--- Account Details ---\n";
        cout << "Account Number: " << accountNumber << "\n";
        cout << "Account Holder: " << accountHolderName << "\n";
        cout << "Balance: " << fixed << setprecision(2) << balance << " BDT\n";
        cout << "-----------------------\n";
    }
};

int main() {
    vector<BankAccount> accounts;
    int choice;

    cout << "=== Welcome to the Bank Management System ===\n";

    while (true) {
        cout << "\n1. Create Account\n";
        cout << "2. Deposit Money\n";
        cout << "3. Withdraw Money\n";
        cout << "4. Display Account\n";
        cout << "5. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        if (choice == 1) {
            int accNum;
            string name;
            double initialDeposit;
            
            cout << "Enter Account Number: ";
            cin >> accNum;
            cout << "Enter Account Holder Name: ";
            cin.ignore();
            getline(cin, name);
            cout << "Enter Initial Deposit (in BDT): ";
            cin >> initialDeposit;

            BankAccount newAccount(accNum, name, initialDeposit);
            accounts.push_back(newAccount);
            cout << "Account created successfully!\n";
        } 
        else if (choice == 2) {
            int accNum;
            double amount;
            cout << "Enter Account Number: ";
            cin >> accNum;
            bool found = false;

            for (auto &acc : accounts) {
                if (acc.getAccountNumber() == accNum) {
                    cout << "Enter Deposit Amount (in BDT): ";
                    cin >> amount;
                    acc.deposit(amount);
                    found = true;
                    break;
                }
            }

            if (!found) {
                cout << "Account not found!\n";
            }
        } 
        else if (choice == 3) {
            int accNum;
            double amount;
            cout << "Enter Account Number: ";
            cin >> accNum;
            bool found = false;

            for (auto &acc : accounts) {
                if (acc.getAccountNumber() == accNum) {
                    cout << "Enter Withdrawal Amount (in BDT): ";
                    cin >> amount;
                    acc.withdraw(amount);
                    found = true;
                    break;
                }
            }

            if (!found) {
                cout << "Account not found!\n";
            }
        } 
        else if (choice == 4) {
            int accNum;
            cout << "Enter Account Number: ";
            cin >> accNum;
            bool found = false;

            for (auto &acc : accounts) {
                if (acc.getAccountNumber() == accNum) {
                    acc.displayAccount();
                    found = true;
                    break;
                }
            }

            if (!found) {
                cout << "Account not found!\n";
            }
        } 
        else if (choice == 5) {
            cout << "Exiting the system. Thank you!\n";
            break;
        } 
        else {
            cout << "Invalid choice! Please try again.\n";
        }
    }

    return 0;
}

