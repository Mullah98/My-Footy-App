'use client';

import Leagues from "@/components/leagues";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/loadingScreen";
import LeagueDashboard from "@/components/leagueDashboard";

export default function Home() {
  const [selectedLeague, setSelectedLeague] = useState(39);
  const [loading, setLoading] = useState(true); 

  const handleSelectedLeague = (leagueId) => {
    setSelectedLeague(leagueId);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
    {loading ? (
      <LoadingScreen />
    ) : (
      <div>
        <Leagues handleSelectedLeague={handleSelectedLeague} />
        <LeagueDashboard league={selectedLeague} />
      </div>
    )}
  </>
  );
}
