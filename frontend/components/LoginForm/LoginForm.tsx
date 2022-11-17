import styles from './LoginForm.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { login } from '../../api/api'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'

const LoginForm = () => {

    const { dispatch } = useAuth()

    const router = useRouter()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const inputUsername = (e: React.FormEvent<HTMLInputElement>) => {
        setUsername((e.target as HTMLInputElement).value)
        setError('')
        setLoading(false)
    }
    
    const inputPassword = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword((e.target as HTMLInputElement).value)
        setError('')
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        if(!username || !password) {
            setError('Invalid login')
            setLoading(false)
            setPassword('')
            return 
        }

        const res = await login(username, password)

        if(res.data) {
            dispatch({type: 'LOGIN', payload: res.data})
            localStorage.setItem('user', JSON.stringify(res.data))
        }

        router.push('/')
    }

    return ( 
        <>
            <div className={styles.card}>
                <h2>Login</h2>
                <div className={styles.link}>
                    <Link href={'/signup'}>Sign Up</Link>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="username"
                        value={username}
                        onChange={inputUsername}    
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="password"
                        value={password}
                        onChange={inputPassword}
                    />
                    <button disabled={loading}>Login</button>
                </form>
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </>
     );
}
 
export default LoginForm;

