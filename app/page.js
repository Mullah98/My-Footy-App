'use client';

// import Navbar from "@/pages/navbar";
import Standings from "@/pages/standings";
import Leagues from "@/pages/leagues";
import { useState } from "react";

export default function Home() {
  const [selectedLeague, setSelectedLeague] = useState(39)

  const handleSelectedLeague = (leagueId) => {
    setSelectedLeague(leagueId)
  }

  return (
    <>
    <Leagues handleSelectedLeague={handleSelectedLeague} />
    {selectedLeague && <Standings leagueId={selectedLeague} />}
    </>
  );
}
