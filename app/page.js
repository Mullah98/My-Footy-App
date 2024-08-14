'use client';

import Standings from "@/pages/standings";
import Leagues from "@/pages/leagues";
import { useState } from "react";
import Navbar from "@/pages/navbar";
import "../styling/page.css"
import Fixtures from "@/pages/fixtures";

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
    {selectedLeague && <Fixtures leagueId={selectedLeague} />}
    </div>
  );
}
