const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
// const readline = require("readline");
// const rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout,
// });
const dirPath = "./data";
const filePath = "./data/contacts.json";

// Membuat folder data jika belum ada
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika belum ada
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

// // Cara biasa, kurang efektif
// rl.question("Masukkan nama anda: ", (nama) => {
//  rl.question("Masukkan nomor HP anda: ", (noHP) => {
//    const contact = { nama, noHP };
//    const fBuffer = fs.readFileSync("data/contacts.json", "utf-8");
//    const contacts = JSON.parse(fBuffer);
//
//    contacts.push(contact);
//
//    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
//
//    console.log("Terimakasih telah mengisi data");
//
//    rl.close();
//  });
// });

// // Cara Async Await dengan Promises
// const pertanyaan = (q) => {
//  return new Promise((resolve, reject) => {
//    rl.question(q, (a) => {
//      resolve(a);
//    });
//  });
// };

// const pertanyaan2 = () => {
//  return new Promise((resolve, reject) => {
//    rl.question("Masukkan email anda: ", (email) => {
//      resolve(email);
//    });
//  });
// };

// const pertanyaan3 = () => {
//  return new Promise((resolve, reject) => {
//    rl.question("Masukkan nomor HP anda: ", (noHP) => {
//      resolve(noHP);
//    });
//  });
// };

const loadContact = () => {
  const fBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fBuffer);

  return contacts;
};

const saveContacts = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const contacts = loadContact();

  // cek duplikat
  const isTrue = contacts.find((c) => c.nama === nama);
  if (isTrue) {
    console.log(chalk.red.bold("Contact sudah ada, gunakan nama lain!"));
    return false;
  }

  // jika ada email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.bold("Email tidak valid!"));
      return false;
    }
  }

  // cek nomor hp
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.bold("Nomor handphone tidak valid!"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(chalk.greenBright.bold("Terimakasih telah mengisi data"));

  //  rl.close();
};

const listContact = () => {
  // ambil isi dari file contacts.json
  const contacts = loadContact();
  console.log(chalk.cyanBright.bold("Daftar Kontak: "));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.bold(`${nama} tidak ditemukan`));
    return false;
  }

  console.log(chalk.cyanBright.bold(contact.nama));
  console.log(contact.noHP);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();

  const newContact = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContact.length) {
    console.log(chalk.red.bold(`${nama} tidak ditemukan`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContact));

  console.log(chalk.greenBright.bold(`Data kontak ${nama} berhasil dihapus!`));
};

// module.exports = { pertanyaan, saveContacts };
module.exports = { saveContacts, listContact, detailContact, deleteContact };
