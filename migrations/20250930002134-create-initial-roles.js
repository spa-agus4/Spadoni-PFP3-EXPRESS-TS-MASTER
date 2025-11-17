import mongodb from "mongodb";

const { ObjectId } = mongodb;

const initialRoles = [
  {
    _id: new ObjectId("69014d51d3f9a79ba199730a"),
    name: "admin",
    description: "Administrador con acceso total",
    permissions: ["create", "update", "delete", "read"],
    isActive: true,
  },
  {
    _id: new ObjectId("69014d6dd3f9a79ba199730c"),
    name: "cliente",
    description: "Usuario con acceso básico",
    permissions: ["read"],
    isActive: true,
  },
  {
    _id: new ObjectId("69014d78d3f9a79ba199730e"),
    name: "gerente",
    description: "Gerente con permisos intermedios",
    permissions: ["read", "update"],
    isActive: false,
  },
];

export const up = async (db) => {
  await db.collection("roles").insertMany(initialRoles);
};

export const down = async (db) => {
  await db
    .collection("roles")
    .deleteMany({ _id: { $in: initialRoles.map((r) => r._id) } });
};