import bcrypt from 'bcrypt'

// ⚙️ Cambiá esta variable por la contraseña que querés encriptar
const plainPassword = '123456'

// 🔑 Nivel de encriptación (10 es un buen valor por defecto)
const saltRounds = 10

async function generateHash() {
  try {
    console.log(`Encriptando contraseña: "${plainPassword}" ...`)
    const hash = await bcrypt.hash(plainPassword, saltRounds)
    console.log('Hash generado:\n')
    console.log(hash)
    console.log('\n✅ Copialo y pegalo en tu base de datos (campo "password")')
  } catch (err) {
    console.error('Error al generar hash:', err)
  }
}

generateHash()