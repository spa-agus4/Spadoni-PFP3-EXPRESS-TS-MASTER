const { ObjectId } = require("mongodb");

const initialUsers = [
  {
    _id: new ObjectId("69014e5bd3f9a79ba1997311"),
    firstName: "agus",
    lastName: "admin",
    email: "agus@admin.com",
    password: "$2b$10$DLdypWMa4Dr5j33F3oWya.Xzg4HjjJpWnAjXZBetFmLEA6lixLtnK",
    phone: "1134567890",
    bornDate: new Date("2001-03-04T00:00:00.000Z"),
    role: new ObjectId("69014d51d3f9a79ba199730a"),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0
  },
  {
    _id: new ObjectId("690939751c108892397a8b01"),
    firstName: "agus",
    lastName: "spa",
    email: "agus@cliente.com",
    password: "$2b$10$lHGxCiLb9qPKIOkCW/32s.oFk7wd.GaWQawipSewfpZJPSe5ogmM6",
    phone: "1134567890",
    governmentId: { type: "cuil", number: "11223344" },
    bornDate: new Date("2001-03-04T00:00:00.000Z"),
    role: new ObjectId("69014d6dd3f9a79ba199730c"),
    isActive: true,
    createdAt: new Date("2025-11-03T23:23:33.859Z"),
    updatedAt: new Date("2025-11-16T20:22:43.588Z"),
    __v: 0
  },
  {
    _id: new ObjectId("69093a361c108892397a8b07"),
    firstName: "prueba",
    lastName: "gerente",
    email: "prueba@gerente.com",
    password: "$2b$10$mpAZtyMSPH.3FivQPlIst.vicGZeQ1gezC/BybC9QeZDQAH1hPsJe",
    phone: "1123456789",
    governmentId: { type: "dni", number: "34567890" },
    bornDate: new Date("1985-10-10T03:00:00.000Z"),
    role: new ObjectId("69014d78d3f9a79ba199730e"),
    isActive: true,
    createdAt: new Date("2025-11-03T23:26:46.495Z"),
    updatedAt: new Date("2025-11-03T23:26:46.495Z"),
    __v: 0
  }
];

module.exports = {
  async up(db, client) {
    await db.collection("users").insertMany(initialUsers);
  },

  async down(db, client) {
    await db.collection("users").deleteMany({
      _id: { $in: initialUsers.map((u) => u._id) }
    });
  }
};
