import { client } from './client'

export const logout = async () => {
    return await client.get('/api/logout')
}

export const login = async (username, password) => {
    return await client.post('/api/login', {
        username: username,
        password: password
    })
}

export const signup = async (username, email, password) => {
    return await client.post('/api/register', {
        username: username,
        email: email,
        password: password
    })
}

export const createBlog = async (title, body, privacy) => {
    return await client.post('/api/blog', {
        title: title,
        body: body,
        privacy: privacy
    })
}

export const getBlogsByUserId = async (userId) => {
    return await client.get('/api/blogs/' + userId)
}

export const getUserIdByUsername = async (username) => {
    return await client.get('/api/users/' + username)
}

export const getBlogs = async () => {
    return await client.get('/api/blogs')
}

export const getUsers = async () => {
    return await client.get('/api/users')
}

export const toggleUserRole = async (userId, role) => {
    return await client.post('/api/roles/:userId', {
        userId: userId, 
        role: role
    })
}

export const deleteUser = async (userId) => {
    return await client.delete('/api/user/' + userId, {
        userId: userId
    })
}

export const deleteBlog = async (blogId) => {
    return await client.delete('/api/blog/' + blogId, {
        blogId: blogId
    })
}

export const togglePrivacy = async (blogId) => {
    return await client.patch('/api/blog/privacy/' + blogId, {
        blogId: blogId
    })
}