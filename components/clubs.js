'use client';

import { useState } from "react";
import styles from "../styling/clubs.module.css";
import { useQuery } from "react-query";
import { searchTeam } from "@/utils/apiFootball";
import Image from "next/image";
import FixturesByCount from "./fixturesByCount";
import Teamsheet from "./teamsheet";
import Transfers from "./transfers";
import { ThreeDot } from "react-loading-indicators";
import { MdErrorOutline } from "react-icons/md";
import {motion} from 'framer-motion';

export default function Clubs({team}) {
    const [club, setClub] = useState('');
    const [selectedClub, setSelectedClub] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [showOverview, setShowOverview] = useState(true);
    const [showTeamsheet, setShowTeamsheet] = useState(false);
    const [showTransfers, setShowTransfers] = useState(false);
    const countries = ['England', 'Spain', 'France', 'Germany', 'Italy'];

    const { data: teamsData, error, isLoading } = useQuery(['teams', team, club], () => searchTeam(club), {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60 * 24
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
      
    //Customing transitions and animations with framer motion
    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 1,
            ease: "easeOut"
          }
        }
      };


    const clubs = filterData(teamsData);

    if (error) {
        return <div className={styles.error}>
            <MdErrorOutline size={60} color="red" />
            <p>Please refresh the page or try again later.</p>
        </div>
    }

    return (
        <div className={styles.clubsContainer}>
            <div className={styles.form}>
                <input type="text"
                placeholder="search for team..." 
                value={club} 
                onChange={handleChange} 
                onClick={handleClick}
                className={styles.input} />
                
                {isLoading ? (
                    <div className={styles.loading}>
                    <ThreeDot
                    variant="pulsate"
                    color="#32cd32" />
                    </div>
                ) : (
                    clubs && Array.isArray(clubs) && (
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
                            alt="Club logo" 
                            height={50} 
                            width={50} 
                            priority={true} />
                            {club.team.name}
                            </li>
                        ))}
                    </ul>
                ))}
            </div>

            
        {selectedClub && (
         <motion.div 
         key={selectedClub.team.id} 
         variants={itemVariants} 
         initial="hidden" 
         animate="visible">
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
                    alt="club stadium" 
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

        {showOverview && (
            <motion.div variants={itemVariants} initial="hidden" animate="visible">
                <div className={styles.bottom}>
                    <div className={styles.clubCurrent}>
                        <h1>Team form</h1>
                        <FixturesByCount teamId={selectedClub.team.id}/>
                    </div>
                </div>
            </motion.div>
        )}

        {showTeamsheet && (
            <motion.div variants={itemVariants} initial="hidden" animate="visible">
                <Teamsheet teamId={selectedClub.team.id}/>
            </motion.div>
        )}

        
        {showTransfers && (
            <motion.div variants={itemVariants} initial="hidden" animate="visible">
                <Transfers teamId={selectedClub.team.id} />
            </motion.div>
        )}
            </motion.div>
        )}
        </div>
    )
}
