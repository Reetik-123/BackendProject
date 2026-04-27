import express from "express"
import { register, login, logOut, getMe } from "../controllers/auth.controller.js"
import isAuth from "../middlewares/isAuth.js"

const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout", logOut)
authRouter.get("/me", isAuth, getMe)

export default authRouter