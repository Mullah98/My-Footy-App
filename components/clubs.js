'use client';

import { useState } from "react";
import "../styling/clubs.css"
import { useQuery } from "react-query";
import { searchTeam } from "@/utils/apiFootball";


export default function Clubs({team}) {
    const [club, setClub] = useState('');
    const nameOfLeague = ['Premier League', 'La Liga', 'Ligue 1', 'Bundesliga', 'Serie A']
    const countries = ['England', 'Spain', 'France', 'Germany', 'Italy']


    const { data: teamsData, isLoading } = useQuery(['teams', team, club], () => searchTeam(club), {
        cacheTime: Infinity,
        staleTime: Infinity,
    })
    
    const handleChange = (e) => {
        setClub(e.target.value)
    }

    const filterData = (teamsData) => {
        if (!teamsData) {
            return []
        }
        const filteredByCountry = teamsData.filter(club => countries.includes(club.team.country) && club.team.id < 600)
        return filteredByCountry
    }
    
    const clubs = filterData(teamsData);

    return (
        <div className="clubs-container">
            <div className="form">
                <input type="text"  placeholder="search for team..." value={club} onChange={handleChange}></input> 

            {clubs && Array.isArray(clubs) && (
                <ul className="form-ul" key={clubs.id}>
                    {clubs.map((club) => (
                        <li className="form-li" key={club.team.id}>
                            {club.team.name}
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    )
}