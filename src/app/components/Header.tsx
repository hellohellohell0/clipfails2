import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.bentoLogo}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                            <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                        </svg>
                    </div>
                    <div className={styles.logoText}>
                        <h1>ClipFails</h1>
                    </div>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/browse" className={styles.navBtn}>Browse</Link>
                    <Link href="/about" className={styles.navBtn}>About</Link>
                    <Link href="/admin" className={styles.navBtn}>Admin</Link>
                </nav>
            </div>
        </header>
    )
}
