import express from "express";
import UserManager from "../controlers/UserManager.js";
import { Router } from "express";

const UserRouter = Router()
const user = new UserManager()

UserRouter.post("/register", async (req, res) => {
    try {
        const newUser = req.body
        await user.addUser(newUser)
        res.redirect("/login")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

UserRouter.post("/login", async (req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password
        console.log(email)
        console.log(password)

        if (email == "adminCoder@coder.com" && password == "adminCod3r123") {
            req.session.email = "adminCoder@coder.com"
            console.log(req.session.email)
            req.session.role = "admin"
            console.log("entre en el if")
            res.redirect("/profile")

        } else {
            const data = await user.validateUser(email, password)
            req.session.email = email
            req.session.role = data.role
            req.session.name = data.name
            req.session.surname = data.surname
            res.redirect("/products")
            console.log("entre en el primer else")
        }

    } catch (error) {
        res.status(500).json("Usuario o contraseña incorrectos")
        console.log("entre en el segundo else")
    }
})

UserRouter.get("/logout", async (req, res) => {
    try {
        req.session.destroy()
        res.redirect("/login")
    } catch (error) {
        res.status(500).json(error)
    }
})

export default UserRouter