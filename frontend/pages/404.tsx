import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }, [])

  return (
    <>
      <Head>
          <title>Blogflow | 404</title>
      </Head>
      <div className="container">
        <h1>Page not found...</h1>
        <p>Going back to the <Link href="/"><a>Home</a></Link> is 3 seconds...</p>
      </div>
    </>
  );
}
 
export default NotFound;