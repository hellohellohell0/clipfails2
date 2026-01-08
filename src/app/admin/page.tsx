'use client'

import { useFormState } from 'react-dom'
import { login } from '@/app/actions/auth'
import styles from './login.module.css'

const initialState = {
    message: '',
}

export default function AdminLogin() {
    const [state, formAction] = useFormState(login, initialState)

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Admin Access</h1>
                <form action={formAction} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" className="input" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="input" required />
                    </div>
                    {state?.message && <p className={styles.error}>{state.message}</p>}
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}
