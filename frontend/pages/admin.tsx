import { User } from '../typings'
import styles from '../styles/Admin.module.scss'
import { useEffect, useState } from 'react';
import { deleteUser, getUsers, toggleUserRole } from '../api/api';
import { FaCheckCircle, FaTimes, FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Link from 'next/link';


const admin = () => {
    const { user } = useAuth()
    const router = useRouter()
    const admin = user?.roles.includes('ADMIN_USER')

    const [users, setUsers] = useState<User[]>()
    const [render, setRender] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUsers()
                setUsers(res.data)
                setRender(false)
            }
            catch (err: any) {
                if(err.response.status === 403) {
                    router.replace('/')
                }
            }
        }   
        fetchData()
        return
    }, [render])

    const toggleAccountRole = async (userId: number, role: string) => {
        const res = await toggleUserRole(userId, role)
        setRender(true)
    }

    const handleDelete = async (userId: number) => {
        const res = await deleteUser(userId)
        setRender(true)
    }

    return ( 
        <>
        <Head>
            <title>Blogflow | Admin</title>
        </Head>
        <div className={styles.container}>
            { admin && <div className={styles.adminContainer}>
                <h1>Admin</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Normal</th>
                            <th>Editor</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                        {users && users.map(user => (
                            <tr key={user?.userId}>
                            <td>{user?.userId}</td>
                            <td><Link href={user?.username}>{user?.username}</Link></td>
                            <td>{user?.email}</td>
                            <td>{user?.roles.includes('NORMAL_USER') ? <FaToggleOn onClick={() => toggleAccountRole(user.userId, 'NORMAL_USER')}/> : <FaToggleOff onClick={() => toggleAccountRole(user.userId, 'NORMAL_USER')}/>}</td>
                            <td>{user?.roles.includes('EDITOR_USER') ? <FaToggleOn onClick={() => toggleAccountRole(user.userId, 'EDITOR_USER')}/> : <FaToggleOff onClick={() => toggleAccountRole(user.userId, 'EDITOR_USER')}/>}</td>
                            <td>{user?.roles.includes('ADMIN_USER') ? <FaToggleOn onClick={() => toggleAccountRole(user.userId, 'ADMIN_USER')}/> : <FaToggleOff onClick={() => toggleAccountRole(user.userId, 'ADMIN_USER')}/>}</td>
                            <td><FaTimes onClick={() => handleDelete(user.userId)}/></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </div>
        </>
     );
}
 
export default admin;