const yargs = require("yargs");
const {
  saveContacts,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      // const contact = {
      //  nama: argv.nama,
      //  email: argv.email,
      //  noHP: argv.noHP,
      // };
      saveContacts(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

// Menampilkan daftar semua nama dan nomor handphone kontak
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama dan nomor handphone",
  handler() {
    listContact();
  },
});

// Menampilkan detail sebuah kontak
yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

// Menghapus contact berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});
yargs.parse();
