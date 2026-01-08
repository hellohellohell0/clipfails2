import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>CF</div>
                    <div className={styles.logoText}>
                        <h1>ClipFails</h1>
                        <p className={styles.slogan}>Find your streaming moment</p>
                    </div>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/browse" className={styles.navLink}>Browse</Link>
                    <Link href="/about" className={styles.navLink}>About</Link>
                    <Link href="/admin" className={styles.navLink}>Admin</Link>
                </nav>
            </div>
        </header>
    )
}
