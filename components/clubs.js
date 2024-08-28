'use client';

import { useState } from "react";
import "../styling/clubs.css"
import { useQuery } from "react-query";
import { searchTeam } from "@/utils/apiFootball";
import Image from "next/image";
import FixturesByCount from "./fixturesByCount";


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
    // console.log(clubs);
    
    

    return (
        <div className="clubs-container">
            <div className="form">
                <input type="text"
                placeholder="search for team..." 
                value={club} 
                onChange={handleChange} 
                onClick={handleClick}>
                </input>
            {clubs && Array.isArray(clubs) && (
                <ul className="form-ul">
                    {clubs.map((club) => (
                        <li className={isClicked ? "hide-li" : "form-li"} key={club.team.id} onClick={() => setSelectedClub(club) & setIsClicked(true)}>
                            {club.team.name}
                        </li>
                    ))}
                </ul>
            )}
            </div>

            
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
                    <div className="club-venue">
                    <h3><span>Stadium:</span>{selectedClub.venue.name}</h3>
                    <h4>Capacity: {selectedClub.venue.capacity}</h4>
                    <h4>Surface: {selectedClub.venue.surface}</h4>
                    <Image src={selectedClub.venue.image} alt="stadium for club" height={150} width={250} priority={true} />
                    </div>
                </div>

                <div className="bottom">
                    <div>
                    <h1>More info going here....</h1>
                    <h2>And here...</h2>
                    <h2>And a whole lot more here///////</h2>
                    </div>
                    <div className="club-current">
                    <h1>Team form</h1>
                    <FixturesByCount teamId={selectedClub.team.id}/>
                    </div>
                </div>
            </div>
            )}

        </div>
    )
}