const { ObjectId } = require("mongodb");

module.exports = {
  /**
   * @param {import('mongodb').Db} db
   */
  async up(db) {
    await db.collection("sedes").insertMany([
      {
        _id: new ObjectId("6912ae04018d726598d7d119"),
        nombre: "saavedra",
        direccion: "calle real 123",
        foto: "https://salas.hitcowork.co/media/site/image/image_48.png",
        phone: "12345678",
        espacios: [],
        isActive: true,
        createdAt: new Date("2025-11-11T03:31:16.443Z"),
        updatedAt: new Date("2025-11-11T03:31:16.443Z"),
        __v: 0,
        horaApertura: new Date("2000-01-01T08:00:00.255Z"),
        horaCierre: new Date("2000-01-01T18:00:00.255Z"),
      },
      {
        _id: new ObjectId("6912ae54018d726598d7d11c"),
        nombre: "palermo",
        direccion: "Calle Borges 1234",
        foto: "https://salas.hitcowork.co/media/site/image/hero_tecno.jpg",
        phone: "87654321",
        espacios: [],
        isActive: true,
        createdAt: new Date("2025-11-11T03:32:36.327Z"),
        updatedAt: new Date("2025-11-11T03:32:36.327Z"),
        __v: 0,
        horaApertura: new Date("2000-01-01T09:00:00.255Z"),
        horaCierre: new Date("2000-01-01T18:00:00.255Z"),
      },
      {
        _id: new ObjectId("6912ae72018d726598d7d11f"),
        nombre: "belgrano",
        direccion: "Calle Cabildo 2345",
        foto: "https://salas.hitcowork.co/media/site/image/image_46_2eOfYa1.png",
        phone: "45612387",
        espacios: [],
        isActive: true,
        createdAt: new Date("2025-11-11T03:33:06.849Z"),
        updatedAt: new Date("2025-11-11T03:33:06.849Z"),
        __v: 0,
        horaApertura: new Date("2000-01-01T09:00:00.255Z"),
        horaCierre: new Date("2000-01-01T19:00:00.255Z"),
      }
    ]);
  },

  /**
   * @param {import('mongodb').Db} db
   */
  async down(db) {
    await db.collection("sedes").deleteMany({
      _id: {
        $in: [
          new ObjectId("6912ae04018d726598d7d119"),
          new ObjectId("6912ae54018d726598d7d11c"),
          new ObjectId("6912ae72018d726598d7d11f"),
        ],
      },
    });
  },
};