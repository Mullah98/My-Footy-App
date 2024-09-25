'use client';

import Fixtures from "@/components/fixtures";
import Leagues from "@/components/leagues";
import Standings from "@/components/standings";
import { useState } from "react";


export default function StandingsPage() {
    const [selectedLeague, setSelectedLeague] = useState(39);

    const handleSelectedLeague = (leagueId) => {
        setSelectedLeague(leagueId)
      }
    
      return (
        <div>
          <Leagues handleSelectedLeague={handleSelectedLeague} />
          {selectedLeague && <Standings leagueId={selectedLeague} />}
          {selectedLeague && <Fixtures leagueId={selectedLeague} />}
        </div>
      );
}