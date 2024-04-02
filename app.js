const readLine = require("readline");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const accountA = {
  name: "John Doe",
  balance: 0,
  pin: "123456",
  cardNumber: "1234 5678 1234 5678",
  transactions: [],
};

const accountB = {
  name: "Jane Doe",
  balance: 0,
  pin: "654321",
  cardNumber: "5678 1234 5678 1234",
  transactions: [],
};

const accounts = [accountA, accountB];

function validateCardNumber(cardNumber) {
  return accounts.find((account) => account.cardNumber === cardNumber);
}

function validatePin(cardNumber, pin) {
  // TODO: validate pin
  const account = validateCardNumber(cardNumber);
  if (account && account.pin === pin) {
    return account;
  } else {
    return null;
  }
}

function checkBalance() {
  // TODO: check balance
}

async function deposit(account) {
  const depositAmount = parseFloat(
    await askQuestion("Masukkan jumlah uang yang ingin Anda setor: ")
  );

  if (isNaN(depositAmount) || depositAmount <= 0) {
    console.log("Jumlah yang dimasukkan tidak valid.");
    return;
  }

  account.balance += depositAmount;
  console.log(`Anda berhasil menyetor uang sebesar Rp ${depositAmount}.`);

  // Record the transaction
  const transaction = {
    type: "Deposit",
    amount: depositAmount,
  };
  account.transactions.push(transaction);
}

function viewTransactions(account) {
  // TODO: view transactions
  console.log("Riwayat Transaksi:");

  if (account.transactions.length === 0) {
    console.log("Belum ada transaksi.");
  } else {
    account.transactions.forEach((transaction, index) => {
      console.log(
        `${index + 1}. ${transaction.type}: Rp ${transaction.amount}`
      );
    });
  }
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  let currentUser = null;

  while (!currentUser) {
    const cardNumber = await askQuestion("Masukkan nomor kartu ATM anda: ");
    const account = validateCardNumber(cardNumber);

    if (account) {
      let pinAttempts = 0;
      let pin = await askQuestion("Masukkan PIN Anda: ");
      // TODO: Validate pin
      let validateAccount = validatePin(cardNumber, pin);

      while (!validateAccount && pinAttempts < 2) {
        console.log("PIN salah. Silahkan coba lagi.");
        pin = await askQuestion("Masukkan PIN Anda: ");
        validateAccount = validatePin(cardNumber, pin);
        pinAttempts++;
      }
      if (validateAccount) {
        currentUser = validateAccount;
        console.log(`Selamat datang, ` + currentUser.name + `!`);
      } else {
        console.log(
          "Anda telah memasukkan PIN yang salah sebanyak 3 kali. Silahkan coba lagi."
        );
        rl.close();
        return;
      }
    } else {
      console.log("Nomor kartu tidak valid. Silahkan coba lagi.");
    }
  }
  do {
    console.log("====================================");
    console.log("Menu ATM:");
    console.log("1. Cek Saldo");
    console.log("2. Setor Tunai");
    console.log("3. Riwayat Transaksi");
    console.log("4. Keluar");

    choice = await askQuestion("Masukkan pilihan Anda: ");

    switch (parseInt(choice)) {
      case 1:
        // TODO: check balance
        break;
      case 2:
        await deposit(currentUser);
        break;
      case 3:
        // TODO: view transactions
        viewTransactions(currentUser);
        break;
      case 4:
        // TODO: exit
        console.log("Terima kasih telah menggunakan layanan ATM. Sampai jumpa!");
        console.log("====================================");
        rl.close();
        return;
    }
  } while (choice !== 4); 
}

main();
