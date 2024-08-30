import { getClubFixtures } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import "../styling/fixturesByCount.css"
import Image from "next/image";

export default function FixturesByCount({teamId}) {

    const {data: fixtures, isLoading} = useQuery(
        ['fixtures', teamId], () => getClubFixtures(teamId), {
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );
    
    const lastFive = fixtures?.last5Games;
    const nextGame = fixtures?.nextGame[0];
    console.log(nextGame);

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
                    <Image src={fixture.teams.home.logo} alt="stadium for club" height={50} width={50} priority={true} />
                    <span className="fixture-goals">{fixture.goals.home}</span>
                    <p>-</p>
                    <span className="fixture-goals">{fixture.goals.away}</span>
                    <Image src={fixture.teams.away.logo} alt="stadium for club" height={50} width={50} priority={true} />
                </div>
            ))}
            </>
            )}
            </div>

            <div className="next-fixture">
            <h3>Upcoming fixtures</h3>
            {nextGame && (
            <>
                <div className="fixture">
                <div className="team">
                    <Image src={nextGame.teams.home.logo} alt="stadium for club" height={100} width={100} priority={true} />
                    <span className="team-name">{nextGame.teams.home.name}</span>
                </div>
                <div className="fixture-date">
                <p className="fixture-time">Time here</p>
                <p className="fixture-date">Date here</p>
                </div>
                <div className="team">
                    <Image src={nextGame.teams.away.logo} alt="stadium for club" height={100} width={100} priority={true} />
                    <span className="team-name">{nextGame.teams.away.name}</span>
                </div>
                </div>
                </>
            )}
            </div>
        </div>
    )
}
