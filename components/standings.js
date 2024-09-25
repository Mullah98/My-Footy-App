'use client'

import { getStandings } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import { useState } from "react";
import Image from 'next/image';
import styles from '../styling/standings.module.css';
import Dropdown from "./dropdown";
import { Mosaic } from 'react-loading-indicators';
import { motion } from "framer-motion";
import { MdErrorOutline } from "react-icons/md";

export default function Standings({ leagueId }) {
    const [selectSeason, setSelectSeason] = useState('2024');

    const { data: standingsData, error, isLoading } = useQuery(
        ['standings', leagueId, selectSeason], () => getStandings(leagueId, selectSeason), {
            staleTime: 1000 * 60 * 60,
            cacheTime: 1000 * 60 * 60 * 24
        }
    );

    const filterStandings = (standingsData) => {
        if (!standingsData) {
            return [];
        }
        const flattenedData = standingsData.flat(3);        
        return flattenedData
    }

    const standings = filterStandings(standingsData)

    const handleSeasonChange = (value) => {
        setSelectSeason(value)
    }

    //Team form will be in letters (W / D / L). Split each letter and reverse it so can render the form in order
    const renderTeamForm = (form) => {
        return form.split('').reverse().map((result, index) => (
            <span key={index} className={`${styles.formResult} ${styles[result]}`}>
                {result}
            </span>
        ));
    }

    if (error) {
        return <div className={styles.loading}>
            <h2>Error fetching data 😟</h2>
            <MdErrorOutline size={60} color="red" />
            <p>Please refresh the page or try again later.</p>
        </div>
    }
    
    return (
        <div className={styles.standingsContainer}>
            <Dropdown changeSeason={handleSeasonChange} />
            <h1 className={styles.h1}>League table</h1>
            {isLoading ? (
                <div className={styles.loading}>
                    <Mosaic 
                        color="#32cd32" 
                        size="large" 
                        text="Loading" 
                        textColor="" />
                </div>
            ) : (
                <motion.div 
                initial={{opacity: 0, x: -100}}
                animate={{opacity: 1, x: 0}}
                transition={{ type: 'spring', stiffness: 50, damping: 20, duration: 0.8}}
                >
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.rowHeader}>
                            <th className={styles.th}>Position</th>
                            <th className={`${styles.th} ${styles.teamForm}`}>Team</th>
                            <th className={styles.th}>Games played</th>
                            <th className={styles.th}>W</th>
                            <th className={styles.th}>D</th>
                            <th className={styles.th}>L</th>
                            <th className={styles.th}>+/-</th>
                            <th className={styles.th}>GD</th>
                            <th className={styles.th}>Points</th>
                            <th className={`${styles.th} ${styles.formHead}`}>Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((team, i) => (
                            <tr key={i} className={styles.tr}>
                                <td className={styles.td}>{team.rank}</td>
                                <td className={`${styles.td} ${styles.teamCell}`}>
                                    <Image src={team.team.logo} alt="logo for team" height={45} width={45} priority={true} />
                                    {team.team.name}
                                </td>
                                <td className={styles.td}>{team.all.played}</td>
                                <td className={styles.td}>{team.all.win}</td>
                                <td className={styles.td}>{team.all.draw}</td>
                                <td className={styles.td}>{team.all.lose}</td>
                                <td className={styles.td}>{team.all.goals.for}-{team.all.goals.against}</td>
                                <td className={styles.td}>{team.goalsDiff}</td>
                                <td className={styles.td}>{team.points}</td>
                                <td className={`${styles.td} ${styles.teamForm}`}>{renderTeamForm(team.form)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </motion.div>
            )}
        </div>
    )
}
