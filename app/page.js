'use client';

import Leagues from "@/components/leagues";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/loadingScreen";
import styles from "./page.module.css"
import LeagueDashboard from "@/components/leagueDashboard";

export default function Home() {
  const [selectedLeague, setSelectedLeague] = useState(39);
  const [loading, setLoading] = useState(false); 

  const handleSelectedLeague = (leagueId) => {
    setSelectedLeague(leagueId);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
    {loading ? (
      <LoadingScreen />
    ) : (
      <div className={styles.main}>
        <Leagues handleSelectedLeague={handleSelectedLeague} />
        <LeagueDashboard league={selectedLeague} />
      </div>
    )}
  </>
  );
}
