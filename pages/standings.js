'use client'

import { getAllStandings } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import Image from 'next/image';
import styles from '../app/page.module.css'


export default function Standings() {

    const { data: standingsData, error, isLoading, dataUpdatedAt} = useQuery('standings', getAllStandings, {
        staleTime: Infinity,//1000 * 60 * 60
        cacheTime: Infinity,//1000 * 60 * 60 * 24
        // onSuccess: (data) => {
        //     console.log('Data from api', data);
        // },
        onSettled: (data, error) => {
            const now = Date.now()
            const oneMin = 1000 * 60
            if (now - dataUpdatedAt < oneMin) {
                console.log("Fetching data from API");
            } else {
                console.log("Using cached data");
            }
        }
    });

    const filterStandings = (standingsData) => {
        if (!standingsData) {
            return [];
        }
        const flattenedData = standingsData.flat(3);
        console.log('----->', flattenedData);
        
        return flattenedData
    }

    const standings = filterStandings(standingsData)

    return (
        <div className={styles.teams}>
        <h1 className={styles.header}>League table</h1>
            <table className={styles.data}>
                <thead className={styles.head}>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Games played</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>+/-</th>
                    <th>GD</th>
                    <th>Points</th>
                </thead>
                <tbody>
                {standings.map((team, i) => (
                    <tr key={i} className={styles.row}>
                    <td>{team.rank}</td>
                    <td><Image src={team.team.logo} alt="logo for team" height={45} width={45} /> {team.team.name}</td>
                    <td>{team.all.played}</td>
                    <td>{team.all.win}</td>
                    <td>{team.all.draw}</td>
                    <td>{team.all.lose}</td>
                    <td>{team.all.goals.for}-{team.all.goals.against}</td>
                    <td>{team.goalsDiff}</td>
                    <td>{team.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
  
}