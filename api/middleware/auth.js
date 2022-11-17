const jwt = require('jsonwebtoken')
const { db } = require('../database')
require('dotenv').config()

const auth = (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if(!accessToken) return res.sendStatus(401)
    try {
        const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        req.userId = data.userId
        req.email = data.email
        req.roles = data.roles
        return next()
    }
    catch (err) {
        return res.status(401).json(err)
    }
}

const authEditor = (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if(!accessToken) return res.sendStatus(401)
    try {
        const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        if(!data.roles.includes('EDITOR_USER')) {
            return res.status(403).json({message: "Need editor access"})
        } 
        req.userId = data.userId
        req.email = data.email
        req.roles = data.roles
        return next()
    }
    catch (err) {
        return res.status(401).json(err)
    }
}

const authEditorOrUser = async (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if(!accessToken) return res.sendStatus(401)
    try {
        const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const { userId } = await db.getBlogById(req.params.id)
        if(userId === data.userId) {
            req.userId = data.userId
            req.email = data.email
            req.roles = data.roles
            return next()
        }
        if(!data.roles.includes('EDITOR_USER')) {
            return res.status(403).json({message: "Need editor access"})
        } 
        req.userId = data.userId
        req.email = data.email
        req.roles = data.roles
        return next()
    }
    catch (err) {
        return res.status(401).json(err)
    }
}

const authAdmin = (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if(!accessToken) return res.sendStatus(401)
    try {
        const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        if(!data.roles.includes('ADMIN_USER')) {
            return res.status(403).json({message: "Need admin access"})
        } 
        req.userId = data.userId
        req.email = data.email
        req.roles = data.roles
        return next()
    }
    catch (err) {
        return res.status(401).json(err)
    }
}

module.exports = { auth, authEditorOrUser, authAdmin }