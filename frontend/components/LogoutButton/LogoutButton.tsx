import styles from './LogoutButton.module.scss'
import { FaSignOutAlt } from 'react-icons/fa'
import { logout } from '../../api/api'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'

const LogoutButton = () => {

    const router = useRouter()
    const { dispatch } = useAuth()

    const handleLogout = async () => {
        const res = await logout()
        dispatch({type: 'LOGOUT'})
        localStorage.removeItem('user')
        router.push('/login')
    }

    return ( 
        <>
            <div className={styles.btn}>
                <FaSignOutAlt onClick={handleLogout}/>
            </div>
        </>
     );
}
 
export default LogoutButton;