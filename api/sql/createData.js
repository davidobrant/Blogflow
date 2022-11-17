const { db } = require('../database')

const init = () => {
    db.initRoles()
    db.initUsers()
    db.initUsersWithRoles()
    db.initBlogs()
}

init()

setTimeout(() => {
    process.exit(0)
}, 1200) 