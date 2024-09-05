'use client';

import { useState } from "react";
import "../styling/players.css";
import PlayersSearchForm from "./playersSearchForm";
import { useQuery } from "react-query";
import { searchPlayer } from "@/utils/apiFootball";

export default function Players() {
    const [player, setPlayer] = useState('')
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [selectedLeague, setSelectedLeague] = useState(39)

    const { data: playerData, isLoading } = useQuery(['players', selectedLeague, player], () => searchPlayer(selectedLeague, player), {
        cacheTime: Infinity,
        staleTime: Infinity
    });

    console.log(player);
    console.log(playerData);
    
    

    return (
        <div className="players-container">
            <div className="form">
            <PlayersSearchForm query={player} />
            </div>
            <div className="results">
            </div>
        </div>
    )
}