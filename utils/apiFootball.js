const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const HEADERS = {
    'x-rapidapi-key': API_KEY,
	'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
};

export const getLeagues = async () => {
    const url = `${BASE_URL}/leagues`;
    const options = {
        method: 'GET',
        headers: HEADERS,
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.response
    } catch(error) {
        console.log('Error fetching leagues', error);
        throw error;
    }
}

export const getStandings = async (leagueId, year) => {
    const url = `${BASE_URL}/standings?league=${leagueId}&season=${year}`;
    const options = {
        method: 'GET',
        headers: HEADERS,
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.response[0].league.standings
    } catch(error) {
        console.log('Error fetching standings', error);
        throw error;
    }
}

export const getFixtures = async (leagueId, round) => {
    const url = `${BASE_URL}/fixtures?league=39&season=2024&round=Regular%20Season%20-%20${round}`;
    const options = {
        method: 'GET',
        headers: HEADERS,
    };

    try {
        const response = await fetch(url, options);
        const result  = await response.json();
        return result.response;
    } catch(error) {
        console.log('Error fetching fixtures', error);
        throw error;
    }
}

// export const getTeams = async (leagueId, year, teamId) => {
//     const url1 = `${BASE_URL}/teams/statistics?league=${leagueId}&season=${year}&team=${teamId}`;
//     const url2 = `${BASE_URL}/teams?id=${teamId}`;

//     const options = {
//         method: 'GET',
//         headers: HEADERS,
//     };

//     try {
//         const allResponses = await Promise.all([fetch(url1), fetch(url2)]);
//         const response1 = await allResponses[0].json();
//         const response2 = await allResponses[1].json();
//         console.log(response2);
        
//         return response2;

//     } catch(error) {
//         console.log('Error fetching teams', error);
//         throw error;
//     }
// }

export const searchTeam = async (team) => {
    const url = `${BASE_URL}/teams?search=${team}`;
    const options = {
        method: 'GET',
        headers: HEADERS,
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.response;
        
        
    } catch(error) {
        console.log('Error fetch teams', error);
        throw error;
    }
}