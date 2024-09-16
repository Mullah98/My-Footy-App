import "../styling/leagueDashboard.css"
import PlayerLeagueStats from "./playerLeagueStats";

export default function LeagueDashboard({league}) {
    return (
        <div className="dashboard">
            <div className="dashboard-left">Left side</div>
            <div className="dashboard-middle">Middle</div>
            <div className="dashboard-right">
            <div className="dashboard-right-top">Top right</div>
            <div className="dashboard-right-bottom">
            <PlayerLeagueStats leagueId={league}/>
            </div>
            </div>
        </div>
    )
}