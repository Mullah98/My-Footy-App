import { getClubStats } from "@/utils/apiFootball";
import { useQuery } from "react-query";

export default function ClubStatistics({leagueId, teamId}) {
    const { data: clubCurrentStats, error, isLoading} = useQuery(
        ['clubCurrentStats', leagueId, teamId], () => getClubStats(39, 33), {
            staleTime: 1000 * 60 * 60,
            cacheTime: 1000 * 60 * 60 * 24
        });

        if (!clubCurrentStats) {
            return []
        }

        // console.log(clubCurrentStats);

        return (
            <div className="currentStat-container">
                <div>Form</div>
                <div>Goals scored home & away</div>
                <div>Goals conceded home & away</div>
                <div>Biggest home win & away</div>
            </div>
        )
        
}