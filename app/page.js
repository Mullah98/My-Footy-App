'use client';

import Standings from "@/pages/standings";
import Leagues from "@/pages/leagues";
import { useState } from "react";
import Navbar from "@/pages/navbar";
import "./page.css"

export default function Home() {
  const [selectedLeague, setSelectedLeague] = useState(39)

  const handleSelectedLeague = (leagueId) => {
    setSelectedLeague(leagueId)
  }

  return (
    <div className="main">
    <Navbar />
    <Leagues handleSelectedLeague={handleSelectedLeague} />
    {selectedLeague && <Standings leagueId={selectedLeague} />}
    </div>
  );
}
