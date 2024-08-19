'use client';

import { useState } from "react";
import "../styling/clubs.css"

export default function Clubs() {
    const [query, setQuery] = useState('');
    
    return (
        <div className="clubs-container">
            <div className="form">
                <input type="text"></input> 
            </div>
        </div>
    )
}