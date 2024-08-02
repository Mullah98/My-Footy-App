const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const HEADERS = {
    'x-rapidapi-key': API_KEY,
	'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
};

export const getAllLeagues = async () => {
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

export const getAllStandings = async () => {
    const url = `${BASE_URL}/standings?league=39&season=2023`;
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

//EPL:39
//SerieA:135
//Bundesliga:78
//Laliga:140
//Ligue1:61