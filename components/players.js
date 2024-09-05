'use client';

import { useState } from "react";
import "../styling/players.css";
import PlayersSearchForm from "./playersSearchForm";
import { useQuery } from "react-query";
import { searchPlayer } from "@/utils/apiFootball";

export default function Players() {
    const [query, setQuery] = useState('')
    const [selectedLeague, setSelectedLeague] = useState(39)
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    // const [isClicked, setIsClicked] = useState(false)


    const { data: playersData, isLoading } = useQuery(['players', selectedLeague, query], () => searchPlayer(selectedLeague, query), {
        cacheTime: Infinity,
        staleTime: Infinity
    });

    const players = playersData || [];
    
    const handleSelectedPlayer = (player) => {
        setSelectedPlayer(player)
        // setIsClicked(true)
    }

    console.log(selectedPlayer);
    
    
    
    

    
    

    return (
        <div className="players-container">
            <div className="form">
            <PlayersSearchForm 
            query={query} 
            setQuery={setQuery} 
            league={selectedLeague} 
            setLeague={setSelectedLeague} 
            playersData={players} 
            selectedPlayer={handleSelectedPlayer}
            />
            </div>
            <div className="players-main">
            {selectedPlayer && isClicked && (
                <div>
            <h1>{selectedPlayer.player.name}</h1>
            <h1>{selectedPlayer.player.height}</h1>
                </div>
            )}
            </div>
        </div>
    )
}