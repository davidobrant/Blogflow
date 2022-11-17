import Link from 'next/link'
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import LogoutButton from '../LogoutButton/LogoutButton';
import styles from './Navbar.module.scss'

const Navbar = () => {
    const { user } = useAuth()
    const admin = user?.roles.includes('ADMIN_USER')
    const router = useRouter()

    if(router.pathname === '/login' || router.pathname === '/signup') {
        return <></>
    }

    return ( 
        <nav className={styles.nav}>
            <Link href={'/'}><div className={styles.logo}>Blogflow</div></Link>
            {user && <div className={styles.userInfo}>{user.email}</div>}
            <ul className={styles.list}>
                <Link href={'/'}><li><div className={styles.navLink}>Flow</div></li></Link>
                <Link href={'/profile'}><li className={styles.listLink}><div className={styles.navLink}>Profile</div></li></Link>
                {admin && <Link href={'/admin'}><li className={styles.listLink}><div className={styles.navLink}>Admin</div></li></Link>}
            </ul>
            <LogoutButton />
        </nav>
    );
}
 
export default Navbar;