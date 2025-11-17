const { ObjectId } = require("mongodb");

module.exports = {
  /**
   * Inserta los espacios iniciales
   */
  async up(db, client) {
    await db.collection("espacios").insertMany([
      {
        _id: new ObjectId("6917ff0e8a8e08588076a181"),
        nombre: "mesa teléfono",
        capacidad: 4,
        foto: "https://http2.mlstatic.com/D_987490-MLA92287550026_092025-C.jpg",
        sede: new ObjectId("6912ae04018d726598d7d119"),
        isActive: true,
        createdAt: new Date("2025-11-15T04:18:22.625Z"),
        updatedAt: new Date("2025-11-15T04:18:22.625Z"),
        __v: 0
      },
      {
        _id: new ObjectId("691b15a1311672405860dffc"),
        nombre: "Sala A",
        capacidad: 3,
        foto: "https://images.squarespace-cdn.com/content/v1/64e7eae5713d422746cdb254/da9ad485-3c32-4551-b2bb-46987b73cb2b/_JGC8539+%281%29-min.jpg",
        sede: new ObjectId("6912ae04018d726598d7d119"),
        isActive: true,
        createdAt: new Date("2025-11-17T12:31:29.320Z"),
        updatedAt: new Date("2025-11-17T12:31:29.320Z"),
        __v: 0
      },
      {
        _id: new ObjectId("6918000a8a8e08588076a182"),
        nombre: "Mesa ventana",
        capacidad: 2,
        foto: "https://http2.mlstatic.com/D_856421-MLA54291879912_032023-C.jpg",
        sede: new ObjectId("6912ae04018d726598d7d119"),
        isActive: true,
        createdAt: new Date("2025-11-16T01:01:12.000Z"),
        updatedAt: new Date("2025-11-16T01:01:12.000Z"),
        __v: 0
      },
      {
        _id: new ObjectId("6918000b8a8e08588076a183"),
        nombre: "Mesa jardín",
        capacidad: 6,
        foto: "https://http2.mlstatic.com/D_743210-MLA51599822144_092022-C.jpg",
        sede: new ObjectId("6912ae54018d726598d7d11c"),
        isActive: true,
        createdAt: new Date("2025-11-16T01:02:40.000Z"),
        updatedAt: new Date("2025-11-16T01:02:40.000Z"),
        __v: 0
      },
      {
        _id: new ObjectId("6918000c8a8e08588076a184"),
        nombre: "Mesa balcón",
        capacidad: 3,
        foto: "https://http2.mlstatic.com/D_951233-MLA43719231045_102020-C.jpg",
        sede: new ObjectId("6912ae04018d726598d7d119"),
        isActive: true,
        createdAt: new Date("2025-11-16T01:03:55.000Z"),
        updatedAt: new Date("2025-11-16T01:03:55.000Z"),
        __v: 0
      },
      {
        _id: new ObjectId("6918000d8a8e08588076a185"),
        nombre: "Mesa comedor grande",
        capacidad: 8,
        foto: "https://http2.mlstatic.com/D_934540-MLA50211959956_062022-C.jpg",
        sede: new ObjectId("6912ae54018d726598d7d11c"),
        isActive: true,
        createdAt: new Date("2025-11-16T01:05:01.000Z"),
        updatedAt: new Date("2025-11-16T01:05:01.000Z"),
        __v: 0
      },
      {
        _id: new ObjectId("6918000e8a8e08588076a186"),
        nombre: "Mesa individual",
        capacidad: 1,
        foto: "https://http2.mlstatic.com/D_612911-MLA51864390238_102022-C.jpg",
        sede: new ObjectId("6912ae04018d726598d7d119"),
        isActive: true,
        createdAt: new Date("2025-11-16T01:06:18.000Z"),
        updatedAt: new Date("2025-11-16T01:06:18.000Z"),
        __v: 0
      },
      {
        _id: new ObjectId("6918000f8a8e08588076a187"),
        nombre: "Mesa terraza",
        capacidad: 4,
        foto: "https://http2.mlstatic.com/D_939821-MLA49702820061_042022-C.jpg",
        sede: new ObjectId("6912ae54018d726598d7d11c"),
        isActive: true,
        createdAt: new Date("2025-11-16T01:07:40.000Z"),
        updatedAt: new Date("2025-11-16T01:07:40.000Z"),
        __v: 0
      },
      {
        _id: new ObjectId("691800108a8e08588076a188"),
        nombre: "Mesa bar alta",
        capacidad: 2,
        foto: "https://http2.mlstatic.com/D_951999-MLA44321790097_122020-C.jpg",
        sede: new ObjectId("6912ae04018d726598d7d119"),
        isActive: true,
        createdAt: new Date("2025-11-16T01:08:55.000Z"),
        updatedAt: new Date("2025-11-16T01:08:55.000Z"),
        __v: 0
      },
      {
        _id: new ObjectId("691800118a8e08588076a189"),
        nombre: "Mesa lobby",
        capacidad: 5,
        foto: "https://http2.mlstatic.com/D_780222-MLA43829400290_102020-C.jpg",
        sede: new ObjectId("6912ae54018d726598d7d11c"),
        isActive: true,
        createdAt: new Date("2025-11-16T01:10:10.000Z"),
        updatedAt: new Date("2025-11-16T01:10:10.000Z"),
        __v: 0
      },
      {
        _id: new ObjectId("691800128a8e08588076a18a"),
        nombre: "Mesa cowork",
        capacidad: 6,
        foto: "https://http2.mlstatic.com/D_611122-MLA40999331049_032020-C.jpg",
        sede: new ObjectId("6912ae04018d726598d7d119"),
        isActive: true,
        createdAt: new Date("2025-11-16T01:12:20.000Z"),
        updatedAt: new Date("2025-11-16T01:12:20.000Z"),
        __v: 0
      },
      {
        _id: new ObjectId("691800138a8e08588076a18b"),
        nombre: "Mesa redonda social",
        capacidad: 4,
        foto: "https://http2.mlstatic.com/D_945331-MLA44277210126_122020-C.jpg",
        sede: new ObjectId("6912ae54018d726598d7d11c"),
        isActive: true,
        createdAt: new Date("2025-11-16T01:14:00.000Z"),
        updatedAt: new Date("2025-11-16T01:14:00.000Z"),
        __v: 0
      }
    ]);
  },

  /**
   * Revierte la migration eliminando todos los espacios insertados
   */
  async down(db, client) {
    await db.collection("espacios").deleteMany({
      _id: {
        $in: [
          new ObjectId("6917ff0e8a8e08588076a181"),
          new ObjectId("691b15a1311672405860dffc"),
          new ObjectId("6918000a8a8e08588076a182"),
          new ObjectId("6918000b8a8e08588076a183"),
          new ObjectId("6918000c8a8e08588076a184"),
          new ObjectId("6918000d8a8e08588076a185"),
          new ObjectId("6918000e8a8e08588076a186"),
          new ObjectId("6918000f8a8e08588076a187"),
          new ObjectId("691800108a8e08588076a188"),
          new ObjectId("691800118a8e08588076a189"),
          new ObjectId("691800128a8e08588076a18a"),
          new ObjectId("691800138a8e08588076a18b")
        ]
      }
    });
  }
};