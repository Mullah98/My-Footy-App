'use client';

import { useState } from "react";
import "../styling/players.css";
import PlayersSearchForm from "./playersSearchForm";
import { useQuery } from "react-query";
import { searchPlayer } from "@/utils/apiFootball";

export default function Players() {
    const [query, setQuery] = useState('')
    const [selectedLeague, setSelectedLeague] = useState(39)

    const { data: playersData, isLoading } = useQuery(['players', selectedLeague, query], () => searchPlayer(selectedLeague, query), {
        cacheTime: Infinity,
        staleTime: Infinity
    });

    const filterPlayersData = (playersData) => {
        if (!playersData) {
            return []
        }
        const player = playersData
        return player
    }

    const players = filterPlayersData(playersData)


    // console.log('from players.js' , player);
    
    
    

    
    

    return (
        <div className="players-container">
            <div className="form">
            <PlayersSearchForm 
            query={query} 
            setQuery={setQuery} 
            league={selectedLeague} 
            setLeague={setSelectedLeague} 
            playersData={players} 
            />
            </div>
            <div className="players-main">
            </div>
        </div>
    )
}