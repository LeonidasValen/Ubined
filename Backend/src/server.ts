import { Request, Response } from "express"
import app from "./app"
import { PORT } from "./config"
import authRouter from "./routes/auth.routes"
import userRouter from "./routes/user.routes"
import instiRouter from "./routes/inst.routes"

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/institucion', instiRouter);

app.listen(PORT, ():void =>{
    console.log(`Server iniciado puerto: http://localhost:${PORT}`)
})

app.get('/', (req: Request, res: Response): void =>{
    res.send("Bienvenido al backend!")
})