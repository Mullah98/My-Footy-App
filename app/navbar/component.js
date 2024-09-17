import Link from 'next/link';
import styles from "./navbar.module.css"

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <ul className={styles.ul}>
                <li className={styles.li}><Link href="/">Overview</Link></li>
                <li className={styles.li}><Link href="/standings">Standings</Link></li>
                <li className={styles.li}><Link href="/clubs">Clubs</Link></li>
                <li className={styles.li}><Link href="/players">Players</Link></li>
            </ul>
        </div>
    )
};