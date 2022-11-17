import Link from "next/link";
import { FaTimes, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { deleteBlog, togglePrivacy } from "../../api/api";
import { useAuth } from "../../hooks/useAuth";
import { Blogpost } from "../../typings";
import { getTimeString } from "../../utils/getTimeString";
import styles from '../BlogPost/BlogPost.module.scss'

type Props = {
    blog: Blogpost;
    onDelete: (blogId: number) => void;
    onUpdate: (blogId: number) => void;
}

const BlogPost = ({ blog, onDelete, onUpdate }: Props) => {

    const { user } = useAuth()
    const editor = user?.roles.includes('EDITOR_USER') || user?.userId === blog.userId
    const currentUser = user?.userId === blog.userId

    const togglePrivace = async (blogId: number) => {
        try {
            const { data } = await togglePrivacy(blogId)
            onUpdate(data)
        }
        catch (err) {
            console.log(err)
        }
    }
    
    const handleDelete = async (blogId: number) => {
        try {
            const { data } = await deleteBlog(blogId)
            onDelete(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    return ( 
        <div className={styles.card}>
            <div className={styles.title}>{blog.title}</div>
            <div className={styles.body}>{blog.body}</div>
            <div className={styles.bottomContainer}>
                <div className={styles.createdAt}><span className={styles.created}>Created: </span>{getTimeString(Number(blog.createdAt))}</div>
                <div className={styles.author}><span className={styles.by}>By: </span><Link href={blog.author}>{blog.author}</Link></div>
            </div>
            { editor && <div className={styles.deleteBtn}><FaTimes onClick={() => handleDelete(blog.blogId)}/></div>}
            { currentUser && 
                <div className={styles.privacy}>
                    {blog.privacy ? <FaToggleOff onClick={() => togglePrivace(blog.blogId)}/> : <FaToggleOn onClick={() => togglePrivace(blog.blogId)}/> }
                    {blog.privacy ? ' private' : ' public' }
                </div>
            }
        </div>
     );
}
 
export default BlogPost;