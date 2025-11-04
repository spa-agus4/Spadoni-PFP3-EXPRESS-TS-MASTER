import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './schemas/user'

dotenv.config()

const db_url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/'
const db_name = process.env.MONGO_DB || 'apiDB'

async function testUser() {
  try {
    console.log('Conectando a MongoDB...')
    const conn = await mongoose.connect(db_url + db_name)
    console.log('Conectado a la base:', conn.connection.name)

    // Listar todas las colecciones
    const db = mongoose.connection.db
    if (!db) throw new Error('No hay conexión a la base de datos')

    const collections = await db.listCollections().toArray()
    console.log('Colecciones en la base:', collections.map(c => c.name))


    // Listar todos los usuarios
    const users = await User.find({}, '+password').lean()
    console.log('Usuarios encontrados:')
    users.forEach(u => {
      console.log({
        _id: u._id,
        email: u.email,
        password: u.password,
        role: u.role,
        isActive: u.isActive,
      })
    })

    // Comparación exacta de email
    const testEmail = 'agus@example.com'
    console.log(`\nBuscando usuario con email exacto: "${testEmail}"`)
    const user = await User.findOne({ email: testEmail }, '+password').lean()
    if (user) {
      console.log('Usuario encontrado:', user)
    } else {
      console.log('Usuario NO encontrado. Probemos con lowercase y trim...')
      // Probar minúsculas y trim
      const allUsers = await User.find({}, '+password').lean()
      allUsers.forEach(u => {
        console.log(`"${u.email}" === "${testEmail}" ?`, u.email === testEmail)
      })
    }

    await mongoose.disconnect()
    console.log('Desconectado de MongoDB')
  } catch (err) {
    console.error('Error:', err)
  }
}

testUser()