import '../pages/styling/navbar.css';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <li><Link href="/standings">Standings</Link></li>
                <li><Link href="/clubs">Club Stats</Link></li>
                <li>Players</li>
            </ul>
        </div>
    )
};