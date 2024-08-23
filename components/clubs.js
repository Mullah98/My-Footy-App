'use client';

import { useState } from "react";
import "../styling/clubs.css"
import { useQuery } from "react-query";
import { searchTeam } from "@/utils/apiFootball";
import Image from "next/image";


export default function Clubs({team}) {
    const [club, setClub] = useState('');
    const [selectedClub, setSelectedClub] = useState(null);
    const countries = ['England', 'Spain', 'France', 'Germany', 'Italy'];


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
    console.log(clubs);
    
    

    return (
        <div className="clubs-container">
            <div className="form">
                <input type="text" placeholder="search for team..." value={club} onChange={handleChange}></input>
            {clubs && Array.isArray(clubs) && (
                <>
                <ul className="form-ul">
                    {clubs.map((club) => (
                        <li className="form-li" key={club.team.id} onClick={() => setSelectedClub(club)}>
                            {club.team.name}
                        </li>
                    ))}
                </ul>
                </>
            )}
            
            {selectedClub && (
            <div>
            <h1>{selectedClub.team.name}</h1>
            <h2>{selectedClub.team.country}</h2>
            <Image src={selectedClub.team.logo} alt="icons for leagues" height={350} width={300} priority={true} />
            </div>
            )}


            </div>
        </div>
    )
}