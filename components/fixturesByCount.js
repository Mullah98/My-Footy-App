import { getClubFixtures } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import "../styling/fixturesByCount.css"

export default function FixturesByCount({teamId}) {

    const {data: fixtures, isLoading} = useQuery(
        ['fixtures', teamId], () => getClubFixtures(teamId), {
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );
    
    const lastFive = fixtures?.last5Games;
    const nextFive = fixtures?.next5Games;
    console.log(lastFive);

    if (isLoading) {
        return (
            <div>
                <p>Loading</p>
            </div>
        )
    }

    const findWinner = (fixture) => {
        const isHome = fixture.teams.home.id === teamId;
        const isAway = fixture.teams.away.id === teamId;
        const homeWin = fixture.teams.home.winner;
        const awayWin = fixture.teams.away.winner;

        if (homeWin === null && awayWin === null) {
            return 'fixture-draw'
        } else if (isHome && homeWin) {
            return 'fixture-win'
        } else if (isAway && awayWin) {
            return 'fixture-win'
        } else if (isHome && !homeWin) {
            return 'fixture-loss'
        } else if (isAway && !awayWin) {
            return 'fixture-loss'
        }
    }

    
    
    
    return (
        <div className="fixtures-container">
            <div className="previous-fixture">
            <h3>Previous fixtures</h3>
            {lastFive && Array.isArray(lastFive) && (
                <>
                    {lastFive.map((fixture, i) => (
                        <div className={findWinner(fixture)} key={i}>
                        <p>{fixture.teams.home.name} <span>{fixture.goals.home} </span>
                        <br />
                        {fixture.teams.away.name} <span>{fixture.goals.away}</span>
                        </p>
                        </div>
            ))}
                </>
            )}
            </div>

            <div className="next-fixture">
            <h3>Upcoming fixtures</h3>
            {nextFive && Array.isArray(nextFive) && (
                <>
                    {nextFive.map((fixture, i) => (
                        <div className="fixture" key={i}>
                        <p>{fixture.teams.home.name} <span>{fixture.goals.home} </span>
                        <br />
                        {fixture.teams.away.name} <span>{fixture.goals.away} </span>
                        </p>
                        </div>
            ))}
                </>
            )}
            </div>
        </div>
    )
}
