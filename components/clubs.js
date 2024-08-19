'use client';

import { useState } from "react";
import "../styling/clubs.css"
import { useQuery } from "react-query";
import { searchTeam } from "@/utils/apiFootball";


export default function Clubs({team}) {
    const [club, setClub] = useState('manchester united');

    const { data: teamsData, isLoading } = useQuery(['teams', team, club], () => searchTeam(club), {
        cacheTime: Infinity,
        staleTime: Infinity,
    }) 

    console.log(teamsData);
    

    const handleChange = (e) => {
        setClub(e.target.value)
    }

        
    return (
        <div className="clubs-container">
            <div className="form">
                <input type="text"  placeholder="search for team..." value={club} onChange={handleChange}></input> 
            {teamsData && Array.isArray(teamsData) && (
                <ul key={teamsData.id}>
                    {teamsData.map((team) => (
                        <li key={team.team.id}>{team.team.name}</li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    )
}