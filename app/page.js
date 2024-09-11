'use client';

import Standings from "@/components/standings";
import Leagues from "@/components/leagues";
import { useState, useEffect } from "react";
import Fixtures from "@/components/fixtures";
import LoadingScreen from "../components/loadingScreen";

export default function Home() {
  const [selectedLeague, setSelectedLeague] = useState(39);
  const [loading, setLoading] = useState(true);

  const handleSelectedLeague = (leagueId) => {
    setSelectedLeague(leagueId)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);



  return (
    <div className="main">
    {loading ? (
      <LoadingScreen />
    ) : (
      <>
        <Leagues handleSelectedLeague={handleSelectedLeague} />
        <Standings leagueId={selectedLeague} />
        <Fixtures leagueId={selectedLeague} />
      </>
    )}
  </div>
  );
}
