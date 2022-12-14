import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getBlogsByUserId, getUserIdByUsername } from '../../api/api'
import BlogPost from '../../components/BlogPost/BlogPost'
import { Blogpost } from '../../typings'
import styles from '../../styles/UserIndex.module.scss'
import Head from 'next/head'
import { useAuth } from '../../hooks/useAuth'

const UserPage = () => {

    const router = useRouter()
    const { username } = router.query
    const [blogs, setBlogs] = useState<Blogpost[]>()
    const [render, setRender] = useState<boolean>(false)

    useEffect(() => {
        setRender(false)
        const get = async () => {
            try {
                const userId = await getUserIdByUsername(username)
                const { data } = await getBlogsByUserId(userId.data)
                setBlogs(data)
            }
            catch (err: any) {
                if(err.response.status === 401) return router.push('/login')
            }
        }
        get()
    }, [username, render])

    return ( 
        <>
            <Head>
                <title>Blogflow | {username}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.blogContainer}>
                    { blogs ? <>
                    <p>Posted by</p>
                    <h1>{username}</h1>
                        {blogs.map(blog => (
                            <BlogPost key={blog.blogId} blog={blog} 
                                onDelete={(id) => {
                                    setBlogs(blogs.filter(blog => blog.blogId !== id))
                                }}
                                onUpdate={(() => {
                                    setRender(true)
                                })}
                                />
                            ))}
                    </> : <>
                        No user found
                    </>}
                </div>
            </div>
        </>

     );
}
 
export default UserPage;