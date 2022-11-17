import { FaPlusCircle } from "react-icons/fa";
import styles from './NewBlogButton.module.scss'

const NewBlogButton = () => {
    return ( 
        <>
            <div className={styles.btn}>
                <FaPlusCircle />
            </div>
        </>
     );
}
 
export default NewBlogButton
