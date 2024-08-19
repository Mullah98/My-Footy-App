import Link from 'next/link';
import "./navbar.css"

export default function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <li><Link href="/standings">Standings</Link></li>
                <li><Link href="/clubs">Clubs</Link></li>
                <li><Link href="/players">Players</Link></li>
            </ul>
        </div>
    )
};