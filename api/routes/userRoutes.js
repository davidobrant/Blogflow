const express = require('express')
const router = express.Router()

const { getUsers, getUserById, registerUser, loginUser, updateUser, deleteUser, logoutUser, toggleUserRole, getUserIdByUsername } = require('../controllers/userController.js')
const { auth, authAdmin } = require('../middleware/auth')

router.post('/register', registerUser)

router.post('/login', loginUser)  

router.get('/logout', logoutUser)

router.get('/users', authAdmin, getUsers)

router.get('/users/:username', auth, getUserIdByUsername)

router.get('/user/:id', auth, getUserById)

router.patch('/user/:id', auth, updateUser)

router.delete('/user/:userId', authAdmin, deleteUser)

router.post('/roles/:userId', authAdmin, toggleUserRole)


module.exports = router