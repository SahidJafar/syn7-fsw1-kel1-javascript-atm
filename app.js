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

function validateCardNumber() {
  return accounts.find((account) => account.cardNumber === cardNumber);
}
function validatePin() {
  // TODO: validate pin
}
function checkBalance() {
  // TODO: check balance
}
function deposit() {
  // TODO: deposit
}
function viewTransactions() {
  // TODO: view transactions
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
      const pin = await askQuestion("Masukkan PIN Anda: ");
      // TODO: Validate pin
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
        // TODO: deposit
        break;
      case 3:
        // TODO: view transactions
        break;
    }
  } while (choice !== 4);

  console.log("Terima kasih telah menggunakan layanan ATM. Sampai jumpa!");
  console.log("====================================");
  rl.close();
}

main();
