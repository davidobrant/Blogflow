import styles from './NewBlogForm.module.scss'
import { FaPlusCircle } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { createBlog } from '../../api/api'
import { Blogpost } from '../../typings'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
    onCreate: (blog: Blogpost) => void;
}

const NewBlogForm = ({ onCreate }: Props) => {

    const router = useRouter()

    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [privacy, setPrivacy] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const inputTitle = (e: React.FormEvent<HTMLInputElement>) => {
        setTitle((e.target as HTMLInputElement).value.toUpperCase())
        setError('')
        setLoading(false)
    }
    
    const inputBody = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setBody((e.target as HTMLTextAreaElement).value)
        setError('')
        setLoading(false)
    }

    const inputPrivacy = () => {
        setPrivacy(!privacy)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        if(!title || !body) {
            setLoading(false)
            setError('Invalid posting')
            return 
        }
        
        try {
            const { data } = await createBlog(title, body, privacy)
            onCreate(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    return ( 
        <>
        <AnimatePresence />
        <motion.div className={styles.formContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x : 300 }}
        >
            <div className={styles.card}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.privacy} onClick={inputPrivacy}>{privacy ? 'private' : 'public'}</div>
                    <input onChange={inputTitle} value={title} className={styles.titleInput} type="text" placeholder='title' />
                    <textarea onChange={inputBody} className={styles.bodyInput} value={body} placeholder='Enter body'></textarea>
                    <button disabled={loading}>Post</button>
                    {error && <div className={styles.error}>{error}</div>}
                </form>
            </div>
        </motion.div>
        </>
     );
}
 
export default NewBlogForm;