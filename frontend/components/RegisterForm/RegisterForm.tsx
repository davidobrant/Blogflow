import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { signup } from '../../api/api'
import styles from './RegisterForm.module.scss'
import { useAuth } from '../../hooks/useAuth'

const RegisterForm = () => {
    const { dispatch } = useAuth()

    const router = useRouter()

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const inputUsername = (e: React.FormEvent<HTMLInputElement>) => {
        setUsername((e.target as HTMLInputElement).value)
        setError('')
        setLoading(false)
    }
    
    const inputEmail = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail((e.target as HTMLInputElement).value)
        setError('')
        setLoading(false)
    }

    const inputPassword = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword((e.target as HTMLInputElement).value)
        setError('')
        setLoading(false)
    }
    
    const inputConfirm = (e: React.FormEvent<HTMLInputElement>) => {
        setConfirm((e.target as HTMLInputElement).value)
        setError('')
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        if(!username || !password) {
            setError('Incomplete registration')
            setLoading(false)
            setPassword('')
            setConfirm('')
            return 
        }

        const res = await signup(username, email, password)
        if(res.data) {
            dispatch({type: 'LOGIN', payload: res.data})
            localStorage.setItem('user', JSON.stringify(res.data))
        }
        router.push('/')
    }
    
    return ( 
        <>
            <div className={styles.card}>
                <h2>Sign Up</h2>
                <div className={styles.link}>
                    <Link href={'/login'}>Login</Link>
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
                        type="email" 
                        name="email" 
                        placeholder="email"
                        value={email}
                        onChange={inputEmail}    
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="choose password"
                        value={password}
                        onChange={inputPassword}
                    />
                    <input 
                        type="password" 
                        name="confirm" 
                        placeholder="confirm password"
                        value={confirm}
                        onChange={inputConfirm}
                    />
                    <button disabled={loading}>Register</button>
                </form>
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </>
     );
}
 
export default RegisterForm;