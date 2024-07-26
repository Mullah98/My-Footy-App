"use client";

import { useEffect, useState } from "react";
import { getAllLeagues } from "@/utils/apiFootball";

export default function Leagues() {
    const [leagues, setLeagues] = useState([])

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const leaguesData = await getAllLeagues();
                console.log(leaguesData);
                setLeagues(leaguesData)

                // if (Array.isArray(leaguesData)) {
                //     setLeagues(leaguesData.response)
                // } else {
                //     console.error('Expected an array, but got:', leaguesData)
                // }
            } catch (error) {
                console.log('Error fetching leagues', error);
            }
        };
        fetchLeagues();
    }, []);

    return (
        <>
            <h2>Leagues</h2>
            <ul>
                {Array.isArray(leagues) && leagues.map((item, i) => (
                    <li key={i}>{item.league.name}</li>
                ))}
            </ul>
        </>
    )
}

