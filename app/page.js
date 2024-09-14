'use client';

import Standings from "@/components/standings";
import Leagues from "@/components/leagues";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/loadingScreen";
import LeagueStats from "@/components/leagueStats";
import styles from "./page.module.css"

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
    <>
    {loading ? (
      <LoadingScreen />
    ) : (
      <div className={styles.main}>
        <Leagues handleSelectedLeague={handleSelectedLeague} />
        <LeagueStats leagueId={selectedLeague} />
        {/* <Standings leagueId={selectedLeague} /> */}
      </div>
    )}
  </>
  );
}
