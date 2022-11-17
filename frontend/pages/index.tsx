import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'
import { Blogpost } from '../typings'
import BlogPost from "../components/BlogPost/BlogPost"
import NewBlogForm from "../components/NewBlogForm/NewBlogForm"
import NewBlogButton from '../components/NewBlogButton/NewBlogButton'
import { getBlogs } from '../api/api'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'

const Home = () => {

  const [blogs, setBlogs] = useState<Blogpost[]>([])
  const [render, setRender] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const { user, dispatch } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const get = async () => {
      try {
        const { data } = await getBlogs()
        setBlogs(data)
      }
      catch (err: any) {
        if(err.response.status === 401) return router.push('/login')
      }
    }
    get()
    setRender(false)
}, [render])

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  return (
    <>
      <Head>
        <title>Blogflow | Flow</title>
      </Head>
        <main className={styles.container}>
          <div className={styles.newBlog} onClick={toggleForm}>
              <NewBlogButton />
          </div>
          {showForm && <NewBlogForm onCreate={(blog) => {
            setRender(true)
            setShowForm(false)
          }}/>}
          <div className={styles.blogContainer}>
            {blogs?.map(blog => (
              <BlogPost key={blog.blogId} blog={blog} 
                onDelete={(id) => {
                  setBlogs(blogs.filter(blog => blog.blogId !== id))
                  setRender(true)
              }}
                onUpdate={() => {
                  setRender(true)
                }}
              />              
            ))}
          </div>
        </main>
    </>
  )
}

export default Home
