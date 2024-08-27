'use client';

import { useState } from "react";
import "../styling/clubs.css"
import { useQuery } from "react-query";
import { searchTeam } from "@/utils/apiFootball";
import Image from "next/image";


export default function Clubs({team}) {
    const [club, setClub] = useState('Manchester United');
    const [selectedClub, setSelectedClub] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const countries = ['England', 'Spain', 'France', 'Germany', 'Italy'];


    const { data: teamsData, isLoading } = useQuery(['teams', team, club], () => searchTeam(club), {
        cacheTime: Infinity,
        staleTime: Infinity,
    })
    
    const handleChange = (e) => {
        setClub(e.target.value)
        e.preventDefault()
    }

    const handleClick = (e) => {
        setClub('');
        setIsClicked(false);
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
                <input type="text" placeholder="search for team..." value={club} onChange={handleChange} onClick={handleClick}></input>
            {clubs && Array.isArray(clubs) && (
                <>
                <ul className="form-ul">
                    {clubs.map((club) => (
                        <li className={isClicked ? "hide-li" : "form-li"} key={club.team.id} onClick={() => setSelectedClub(club) & setIsClicked(true)}>
                            {club.team.name}
                        </li>
                    ))}
                </ul>
                </>
            )}
            
            {selectedClub && (
            <div className="selected">
                <div className="club-main">
                <div className="logo">
                <Image src={selectedClub.team.logo} alt="icon for club" height={200} width={200} priority={true} />
                </div>
                <div>
                <h1>{selectedClub.team.name}</h1>
                <h4>{selectedClub.team.country}</h4>
                <h4>Founded {selectedClub.team.founded}</h4>
                </div>
                </div>
                <div className="bottom">
                <div className="club-venue">
                <h2>Stadium: {selectedClub.venue.name}</h2>
                <h4>Capacity: {selectedClub.venue.capacity}</h4>
                <h4>Surface: {selectedClub.venue.surface}</h4>
                <Image src={selectedClub.venue.image} alt="stadium for club" height={350} width={400} priority={true} />
                </div>
                <div className="club-current">
                <h1>FOrm will go here</h1>
                </div>
                </div>
            </div>
            )}


            </div>
        </div>
    )
}