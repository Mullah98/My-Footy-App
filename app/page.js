'use client';

import Standings from "@/components/standings";
import Leagues from "@/components/leagues";
import { useState } from "react";
import Fixtures from "@/components/fixtures";

export default function Home() {
  const [selectedLeague, setSelectedLeague] = useState(39)

  const handleSelectedLeague = (leagueId) => {
    setSelectedLeague(leagueId)
  }

  return (
    <div className="main">
    <Leagues handleSelectedLeague={handleSelectedLeague} />
    {selectedLeague && <Standings leagueId={selectedLeague} />}
    {selectedLeague && <Fixtures leagueId={selectedLeague} />}
    </div>
  );
}
