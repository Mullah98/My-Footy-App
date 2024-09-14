import { getLeaguePlayerStats } from "@/utils/apiFootball";
import { useState } from "react";
import { useQuery } from "react-query";

export default function LeagueStats({leagueId}) {
    // const [selectedLeague, setSelectedLeague] = useState(39)

    const {data: leagueStats, isLoading} = useQuery(
        ['leagueStats', leagueId], () => getLeaguePlayerStats(leagueId), {
            staleTime: Infinity,
            cacheTime: Infinity
        }
    );

    if (!leagueStats) {
        return []
    }

    const goalscorers = leagueStats.topScorer.slice(0,5)
    const assisters = leagueStats.topAssist.slice(0, 5)
    console.log(goalscorers);
        
}