import "../styling/leagueDashboard.css"
import FixturesList from "./fixturesList";
import MiniStandings from "./miniStandings";
import PlayerLeagueStats from "./playerLeagueStats";

export default function LeagueDashboard({league}) {
    return (
        <div className="dashboard">
            <div className="dashboard-left">
                <MiniStandings leagueId={league}/>
            </div>
            <div className="dashboard-middle">
                <FixturesList leagueId={league} />
            </div>
            <div className="dashboard-right">
            <div className="dashboard-right-top">Top right</div>
            <div className="dashboard-right-bottom">
            <PlayerLeagueStats leagueId={league}/>
            </div>
            </div>
        </div>
    )
}