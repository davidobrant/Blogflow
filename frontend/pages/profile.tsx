import { useEffect, useState } from "react";
import { getBlogsByUserId } from "../api/api";
import BlogPost from "../components/BlogPost/BlogPost";
import { useAuth } from "../hooks/useAuth";
import { Blogpost, User } from "../typings";
import styles from '../styles/Profile.module.scss'
import NewBlogButton from "../components/NewBlogButton/NewBlogButton";
import NewBlogForm from "../components/NewBlogForm/NewBlogForm";
import Head from 'next/head'

const profile = () => {
    const { user } = useAuth()
    const [blogs, setBlogs] = useState<Blogpost[]>()
    const [showForm, setShowForm] = useState(false)
    const [render, setRender] = useState(false)

    useEffect(() => {
        if(!user) return
        const getBlogs = async () => {
            const { data } = await getBlogsByUserId(user.userId)
            setBlogs(data)
        }
        getBlogs()
        setRender(false)
    }, [user, render])

    const toggleForm = () => {
        setShowForm(!showForm)
    }

    return ( 
        <>
            <Head>
                <title>Blogflow | Profile</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.newBlog} onClick={toggleForm}>
                    <NewBlogButton />
                </div>
                {showForm && blogs && <NewBlogForm onCreate={(blog) => {
                    setBlogs([blog, ...blogs])
                    setShowForm(false)
                }}/>}
                <div className={styles.blogContainer}>
                    <h1>Profile</h1>
                    {blogs ? <>
                        {blogs.map(blog => (
                            <BlogPost key={blog.blogId} blog={blog} onDelete={(id) => {
                                setBlogs(blogs.filter(blog => blog.blogId !== id))
                                setRender(true)
                            }}
                            onUpdate={() => {
                                setRender(true)
                            }}
                            />
                        ))}
                    </> : <>
                        <h1>Sorry...</h1>
                        <p>No posts to display</p>  
                    </>}
                </div>
            </div>
        </>
     );
}
 
export default profile;