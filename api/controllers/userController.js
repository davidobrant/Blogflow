const { db } = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const cookieDetails = {
    httpOnly: true, 
    expiresIn: '15m',
    sameSite: 'strict',
    secure: false
}

const getUsers = async (req, res) => {
    try {
        const users = await db.getUsers()
        const usersWithRoles = await Promise.all(users.map(async user => {
            const roles = await db.getUserRoles(user.userId)
            user.roles = roles.map((role) => role.rolename) 
            return user
        }))
        return res.status(200).json(usersWithRoles)
    }
    catch (err) {
        return res.sendStatus(400)
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await db.getUserById(id)
        res.status(200).json(user)
    }
    catch (err) {
        res.sendStatus(400)
    }
}

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if(!username || !email || !password) return res.status(400)
        const user = await db.getUserByUsernameOrEmail(username, email)
        if(user) return res.status(409).json({ message: "User already exists"})
        const hashedPassword = await bcrypt.hash(password, 10)
        const userId = await db.createUser(username, email, hashedPassword)
        await db.setUserRole(Number(userId), 1000)
        const roles = await db.getUserRoles(userId)
        const accessToken = jwt.sign({
            userId: userId,
            email: email, 
            roles: roles.map((role) => role.rolename)
        }, process.env.ACCESS_TOKEN_SECRET) 
        const userData = {
            userId: userId,
            username: username,
            email: email,
            roles: roles.map((role) => role.rolename)
        }
        res.status(201).cookie('accessToken', accessToken, cookieDetails).json(userData)
    }
    catch (err) {
        res.sendStatus(400)
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        if(!username || !password) return res.sendStatus(400)
        const user = await db.getUserByUsername(username)
        if(!user) return res.status(400).json('Invalid username or password')
        const match = await bcrypt.compare(password, user.password)
        if(!match) return res.status(400).json('Invalid username or password')
        const roles = await db.getUserRoles(user.userId)
        const accessToken = jwt.sign({
            userId: user.userId,
            email: user.email, 
            roles: roles.map((role) => role.rolename)
        }, process.env.ACCESS_TOKEN_SECRET) 
        const userData = {
            userId: user.userId,
            username: user.username,
            email: user.email,
            roles: roles.map((role) => role.rolename)
        }
        res.status(200).cookie('accessToken', accessToken, cookieDetails).json(userData) 
    }
    catch (err) {
        res.status(400).json({ message: err})
    }
}

const updateUser = async (req, res) => {
    try {

    }
    catch (err) {
        res.sendStatus(400)
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId
        await db.removeUserWithRoles(userId)
        await db.removeUserWithBlogs(userId)
        await db.removeUser(userId)
        res.status(201).json({message: `User ${userId} succesfully deleted`})
    }
    catch (err) {
        res.sendStatus(400)
    }
}

const getUserIdByUsername = async (req, res) => {
    try {
        const username = req.params.username
        const user = await db.getUserByUsername(username)
        res.status(200).json(user.userId)
    }
    catch (err) {
        res.sendStatus(400)
    }
}

const toggleUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body
        const userRoles = await db.getUserRoles(userId)
        const exists = userRoles.some(p => p.rolename === role)
        const roleId = await db.getRoleId(role)
        if(exists) {
            await db.removeUserRole(userId, roleId)
        } else {
            await db.setUserRole(userId, roleId)
        }
        res.status(200).json({message: "Role changed"})
    }
    catch (err) {
        res.sendStatus(400)
    }
}

const logoutUser = async (req, res) => {
    try {
        res.status(200).clearCookie('accessToken').json({ message: "Logged out"})
    }
    catch (err) {
        res.sendStatus(400)
    }
}


module.exports = { getUsers, getUserById, registerUser, loginUser, updateUser, deleteUser, logoutUser, toggleUserRole, getUserIdByUsername }