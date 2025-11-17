const { ObjectId } = require("mongodb");

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   */
  async up(db, client) {
    const reservas = [
      {
        _id: new ObjectId("69190d4f40108c95fbd7b20f"),
        espacio: new ObjectId("6917ff0e8a8e08588076a181"),
        usuario: new ObjectId("690939751c108892397a8b01"),
        inicio: new Date("2025-11-16T14:00:00.000Z"),
        fin: new Date("2025-11-16T15:00:00.000Z"),
        estado: "realizada",
        createdAt: new Date("2025-11-15T23:31:27.911Z"),
        updatedAt: new Date("2025-11-15T23:31:27.911Z"),
        __v: 0,
      },
      {
        _id: new ObjectId("691a2d099594562e69f28b2e"),
        espacio: new ObjectId("6918000a8a8e08588076a182"),
        usuario: new ObjectId("690939751c108892397a8b01"),
        inicio: new Date("2025-12-16T14:00:00.000Z"),
        fin: new Date("2025-12-16T15:00:00.000Z"),
        estado: "cancelada",
        createdAt: new Date("2025-11-16T19:59:05.931Z"),
        updatedAt: new Date("2025-11-17T02:29:50.492Z"),
        __v: 0,
      },
      {
        _id: new ObjectId("691a2d4b9594562e69f28b37"),
        espacio: new ObjectId("6917ff0e8a8e08588076a181"),
        usuario: new ObjectId("690939751c108892397a8b01"),
        inicio: new Date("2025-12-17T14:00:00.000Z"),
        fin: new Date("2025-12-17T15:00:00.000Z"),
        estado: "programada",
        createdAt: new Date("2025-11-16T20:00:11.777Z"),
        updatedAt: new Date("2025-11-17T01:15:52.894Z"),
        __v: 0,
      },
      {
        _id: new ObjectId("691a34328acccecbabc816a5"),
        espacio: new ObjectId("6917ff0e8a8e08588076a181"),
        usuario: new ObjectId("690939751c108892397a8b01"),
        inicio: new Date("2025-12-30T14:00:00.000Z"),
        fin: new Date("2025-12-30T15:00:00.000Z"),
        estado: "programada",
        createdAt: new Date("2025-11-16T20:29:38.815Z"),
        updatedAt: new Date("2025-11-17T00:55:59.218Z"),
        __v: 0,
      },
      {
        _id: new ObjectId("691aa9c1f3bafd764bbfdf20"),
        espacio: new ObjectId("6917ff0e8a8e08588076a181"),
        usuario: new ObjectId("690939751c108892397a8b01"),
        inicio: new Date("2025-11-19T08:00:00.000Z"),
        fin: new Date("2025-11-19T09:00:00.000Z"),
        estado: "programada",
        createdAt: new Date("2025-11-17T04:51:13.509Z"),
        updatedAt: new Date("2025-11-17T04:51:13.509Z"),
        __v: 0,
      },
      {
        _id: new ObjectId("691b1424311672405860dfdd"),
        espacio: new ObjectId("6918000d8a8e08588076a185"),
        usuario: new ObjectId("690939751c108892397a8b01"),
        inicio: new Date("2025-12-16T11:00:00.000Z"),
        fin: new Date("2025-12-16T12:00:00.000Z"),
        estado: "cancelada",
        createdAt: new Date("2025-11-17T12:25:08.436Z"),
        updatedAt: new Date("2025-11-17T12:26:19.818Z"),
        __v: 0,
      },
    ];

    await db.collection("reservas").insertMany(reservas);
  },

  async down(db, client) {
    await db.collection("reservas").deleteMany({
      _id: {
        $in: [
          new ObjectId("69190d4f40108c95fbd7b20f"),
          new ObjectId("691a2d099594562e69f28b2e"),
          new ObjectId("691a2d4b9594562e69f28b37"),
          new ObjectId("691a34328acccecbabc816a5"),
          new ObjectId("691aa9c1f3bafd764bbfdf20"),
          new ObjectId("691b1424311672405860dfdd"),
        ],
      },
    });
  },
};