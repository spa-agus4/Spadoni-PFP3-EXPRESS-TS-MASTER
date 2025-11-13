import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import statusRouter from './routes/status'
import registerRouter from './routes/register';
import authRouter from './routes/auth'
import userRouter from './routes/user'
import sedeRouter from './routes/sedes'
import sedePublicRouter from './routes/sedes.public'
import espacioRouter from './routes/espacios'
import authentication from './middlewares/authentication'
import authorization from './middlewares/authorization'


const app = express()

// 🔹 1. Middlewares globales
app.use(logger('dev')) // Muestra en consola las peticiones HTTP (GET, POST, etc.)
app.use(cors()) // Permite peticiones desde otros dominios (útil si tu frontend está en otro servidor)
app.use(express.json()) // Permite que Express entienda cuerpos JSON en los requests
app.use(express.urlencoded({ extended: false })) // Permite leer datos de formularios (x-www-form-urlencoded)
app.use(cookieParser()) // Permite leer cookies del navegador

app.use('/register', registerRouter);
app.use('/sedes.public', sedePublicRouter)
// 🔹 2. Middleware de autorización general
app.use(authorization)
// Este probablemente verifica si el usuario tiene permisos para ciertos endpoints.
// Suele ejecutarse ANTES que las rutas, así todas heredan su lógica.

// 🔹 3. Rutas de tu app
app.use('/', statusRouter) // Ruta base para verificar si el servidor está vivo (ej: GET / → “OK”)
app.use('/auth', authRouter) // Aquí se monta tu archivo auth.ts (para login)
app.use('/sedes', authentication, sedeRouter)
app.use('/espacios', authentication, espacioRouter)
//app.use('/users', authentication, authorization, userRouter) // Solo usuarios autenticados acceden a /users
app.use('/users', authentication, userRouter) // Solo usuarios autenticados acceden a /users

export default app