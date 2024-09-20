'use client';

import { useState } from "react";
import styles from "../styling/clubs.module.css";
import { useQuery } from "react-query";
import { searchTeam } from "@/utils/apiFootball";
import Image from "next/image";
import FixturesByCount from "./fixturesByCount";
import Teamsheet from "./teamsheet";
import Transfers from "./transfers";

export default function Clubs({team}) {
    const [club, setClub] = useState('');
    const [selectedClub, setSelectedClub] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [showOverview, setShowOverview] = useState(true);
    const [showTeamsheet, setShowTeamsheet] = useState(false);
    const [showTransfers, setShowTransfers] = useState(false);
    const countries = ['England', 'Spain', 'France', 'Germany', 'Italy'];

    const { data: teamsData, isLoading } = useQuery(['teams', team, club], () => searchTeam(club), {
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    const handleChange = (e) => {
        setClub(e.target.value);
    }

    const handleClick = (e) => {
        setClub('');
        setIsClicked(false);
    }

    const handleOverviewButton = (e) => {
        setShowOverview(true);
        setShowTeamsheet(false);
        setShowTransfers(false);
    }
    const handleTeamsheetButton = (e) => {
        setShowTeamsheet(true);
        setShowOverview(false);
        setShowTransfers(false);
    }

    const handleTransfersButton = (e) => {
        setShowTransfers(true);
        setShowOverview(false);
        setShowTeamsheet(false);
    }

    const filterData = (teamsData) => {
        if (!teamsData) {
            return [];
        }
        const filteredByCountry = teamsData.filter(club => countries.includes(club.team.country) && club.team.id < 600);
        return filteredByCountry;
    }

    const clubs = filterData(teamsData);
    

    return (
        <div className={styles.clubsContainer}>
            <div className={styles.form}>
                <input type="text"
                placeholder="search for team..." 
                value={club} 
                onChange={handleChange} 
                onClick={handleClick}
                className={styles.input} />
                
                {clubs && Array.isArray(clubs) && (
                    <ul className={styles.formUl}>
                        {clubs.map((club) => (
                            <li className={isClicked ? styles.hideLi : styles.formLi} 
                            key={club.team.id} 
                            onClick={() => 
                            setSelectedClub(club) & 
                            setIsClicked(true) & 
                            setShowOverview(true) & 
                            setShowTeamsheet(false)}>
                            <Image src={club.team.logo} 
                            alt="logo for club" 
                            height={50} 
                            width={50} 
                            priority={true} />
                            {club.team.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            
            {selectedClub && (
            <div className={styles.selected}>
            
                <div className={styles.clubMain}>
                    <div className={styles.clubLogo}>
                    <Image src={selectedClub.team.logo} 
                    alt="icon for club" 
                    height={200} 
                    width={200} 
                    priority={true} />
                    </div>
                    <div className={styles.clubInfo}>
                    <h1>{selectedClub.team.name}</h1>
                    <h4>{selectedClub.team.country}</h4>
                    <h4>Founded {selectedClub.team.founded}</h4>
                    </div>
                    <div className={styles.clubVenue}>
                    <h3><span>Stadium: </span>{selectedClub.venue.name}</h3>
                    <h4><span>Capacity: </span>{selectedClub.venue.capacity}</h4>
                    <h4><span>Surface: </span>{selectedClub.venue.surface}</h4>
                    <Image src={selectedClub.venue.image} 
                    alt="stadium for club" 
                    height={150} 
                    width={250} 
                    priority={true} />
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                <button onClick={handleOverviewButton}>Overview</button>
                <button onClick={handleTeamsheetButton}>Squad</button>
                <button onClick={handleTransfersButton}>Transfers</button>
                </div>

                {showTeamsheet && (
                <Teamsheet teamId={selectedClub.team.id}/>
                )}

                {showOverview && (
                <div className={styles.bottom}>
                    <div className={styles.clubCurrent}>
                    <h1>Team form</h1>
                    <FixturesByCount teamId={selectedClub.team.id}/>
                    </div>
                </div>
                )}
                {showTransfers && (
                    <Transfers teamId={selectedClub.team.id} />
                )}
            </div>
            )}

        </div>
    )
}
