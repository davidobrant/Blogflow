const mysql = require('mysql')
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
    multipleStatements: false
});

let db = {}

db.initRoles = () => {
    const sql = 'INSERT INTO Roles (roleId, rolename) VALUES ?';
    const query = mysql.format(sql, [
        [
        [1000, 'NORMAL_USER'],
        [2000, 'EDITOR_USER'],
        [3000, 'ADMIN_USER'],
        ]
    ])
    pool.query(query, (err) => {
        if (err) {
        console.log('ERROR Inserting Roles', err);
        } else {
        console.log('Inserted Roles successfully', err);
        }
    })
}

db.initUsers = () => {
    const sql = 'INSERT INTO Users (username, email, password) VALUES ?';
    const query = mysql.format(sql, [
        [
        ['aaa', 'aaa@xo.com', '$2b$10$fUX6t2lCk/jIAVaRMHk7ieakcPPqh5qL8jwLsVrPVBzX7wZ5eJxhG'],
        ['bbb', 'bbb@xo.com', '$2b$10$fwf6VEYMqYwcpb2jop/XFuzfH2GxxfMCI04Ct6lnJucgY3pDDZE4i'],
        ['ccc', 'ccc@xo.com', '$2b$10$j5kXxXt5TH0y/xBC9Cun.e6BcH.1MaQqZxhYisTYLqTw0603iUuqK'],
        ]
    ])
    pool.query(query, (err) => {
        if (err) {
        console.log('ERROR Inserting Users', err);
        } else {
        console.log('Inserted Users successfully', err);
        }
    })
}

db.initUsersWithRoles = () => {
    const sql = 'INSERT INTO UsersWithRoles (userId, roleId) VALUES ?';
    const query = mysql.format(sql, [
        [
        [1, 1000],
        [1, 2000],
        [1, 3000],
        [2, 1000],
        [2, 2000],
        [3, 1000],
        ]
    ])
    pool.query(query, (err) => {
        if (err) {
        console.log('ERROR Inserting UsersWithRoles', err);
        } else {
        console.log('Inserted UsersWithRoles successfully', err);
        }
    })
}

db.initBlogs = () => {
    const sql = 'INSERT INTO Blogs (title, body, userId, author, createdAt, privacy) VALUES ?';
    const query = mysql.format(sql, [
        [
        ['title 1', 'Post 1', 1, 'aaa', 1668634466318, 0],
        ['title 2', 'Post 2', 1, 'aaa', 1667633466318, 1],
        ['title 3', 'Post 3', 1, 'aaa', 1668434266318, 0],
        ['title 4', 'Post 4', 2, 'bbb', 1668534466318, 0],
        ['title 5', 'Post 5', 2, 'bbb', 1668631466318, 1],
        ['title 6', 'Post 6', 3, 'ccc', 1668624466318, 0],
        ]
    ])
    pool.query(query, (err) => {
        if (err) {
        console.log('ERROR Inserting Blogs', err);
        } else {
        console.log('Inserted Blogs successfully', err);
        }
    })
}

db.getUsers = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Users`
        const query = mysql.format(sql)
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

db.getUsersWithRoles = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT Users.userId, username, email, rolename FROM ((Users INNER JOIN UsersWithRoles ON Users.userId = UsersWithRoles.userId) INNER JOIN Roles ON UsersWithRoles.roleId = Roles.roleId)`
        const query = mysql.format(sql)
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

db.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Users WHERE userId = ?`
        const query = mysql.format(sql, [userId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result[0])
        })
    }) 
}

db.getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Users WHERE username = ?`
        const query = mysql.format(sql, [username])
        pool.query(query, (err, result) => {
            if (err) return reject(err)
            return resolve(result[0])
        })
    })
} 

db.getUserByUsernameOrEmail = (username, email) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT email FROM Users WHERE username = ? OR email = ?`
        const query = mysql.format(sql, [username, email])
        pool.query(query, (err, result) => {
            if (err) return reject(err)
            return resolve(result[0])
        })
    })
} 

db.createUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Users (username, email, password) VALUES (?,?,?)`
        const query = mysql.format(sql, [username, email, password])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result.insertId)
        })
    })
}

db.setUserRole = (userId, roleId) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO UsersWithRoles (userId, roleId) VALUES (?,?)`
        const query = mysql.format(sql, [userId, roleId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

db.removeUserRole = (userId, roleId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM UsersWithRoles WHERE userId = ? AND roleId = ?`
        const query = mysql.format(sql, [userId, roleId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

db.getUserRoles = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT rolename FROM UsersWithRoles INNER JOIN Roles ON UsersWithRoles.roleId = Roles.roleId WHERE userId = ?`
        const query = mysql.format(sql, [userId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

// Blogs 
db.createBlog = (title, body, userId, author, createdAt, privacy) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Blogs (title, body, userId, author, createdAt, privacy) VALUES (?,?,?,?,?,?)`
        const query = mysql.format(sql, [title, body, userId, author, createdAt, privacy])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result.insertId)
        })
    })
}

db.getBlogs = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Blogs WHERE privacy = 0 ORDER BY createdAt DESC`
        const query = mysql.format(sql)
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

db.getBlogById = (blogId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Blogs WHERE blogId = ?`
        const query = mysql.format(sql, [blogId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result[0])
        })
    })
}

db.getBlogsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Blogs WHERE userId = ? ORDER BY createdAt DESC`
        const query = mysql.format(sql, [userId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

db.getBlogsByUserIdPrivate = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Blogs WHERE userId = ? AND privacy = 0 ORDER BY createdAt DESC`
        const query = mysql.format(sql, [userId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

db.getAuthorByBlogId = (blogId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT userId FROM Blogs WHERE blogId = ?`
        const query = mysql.format(sql, [blogId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result[0].userId)
        })
    })
}

db.getPrivacyByBlogId = (blogId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT privacy FROM Blogs WHERE blogId = ?`
        const query = mysql.format(sql, [blogId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result[0])
        })
    })
}

db.setPrivacy = (privacy, blogId) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE Blogs SET privacy = ? WHERE blogId = ?`
        const query = mysql.format(sql, [privacy, blogId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

db.deleteBlog = (blogId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM Blogs WHERE blogId = ?`
        const query = mysql.format(sql, [blogId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

db.getUsernameByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT username FROM Users WHERE userId = ?`
        const query = mysql.format(sql, [userId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result[0].username)
        })
    })
}

db.getRoleId = (role) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT roleId FROM Roles WHERE rolename = ?`
        const query = mysql.format(sql, [role])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result[0].roleId)
        })
    })
}

db.removeUserWithRoles = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM UsersWithRoles WHERE userId = ?`
        const query = mysql.format(sql, [userId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

db.removeUserWithBlogs = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM Blogs WHERE userId = ?`
        const query = mysql.format(sql, [userId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

db.removeUser = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM Users WHERE userId = ?`
        const query = mysql.format(sql, [userId])
        pool.query(query, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}


module.exports = { db }



