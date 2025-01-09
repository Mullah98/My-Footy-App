# My Footy App Project
This is a live football stats app built using **NextJs**, with the data provided by [**API-Football Services**](https://www.api-football.com/).

# Features
- Display live football fixtures, standings, top scorers and assist leaders
- View detailed stats, squads and club transfers for each team
- View upto date statistics for each player
- Data fetched from **API-Football Services**

# Getting started
- `Clone the repository` git clone repository_link
- `Install dependencies` npm install
- `Set up the environment variables by creating a .env.local file with your API key from api-football.com` API_FOOTBALL_KEY=your_api_key_here
- `Run the development server` npm run dev
- `View the app`

# API Integration
This project uses the [**API-Football**](https://www.api-football.com/) to fetch football data. Ensure you have an API key by signing up on their platform.

# Project structure
- `/components:` Contains reusable components such as Player, Team and Fixture
- `/pages:` Main pages of the app including fixtures, standings, and stats
- `/api:` API calls to fetch data

# Deployment with Vercel
- Push the project to your GitHub
- Link your GitHub to Vercel
- Deploy your app with a single click
- More details on the deployment [**Next.js deployment docs**](https://nextjs.org/docs/pages/building-your-application/deploying)

# Challenges
- `Handling Real-Time Data-` Managing and updating live football data for fixtures and stats in real time was challenging. I implemented efficient caching techniques using React Query to reduce API calls and improve performance by automatically caching and syncing data.

- `API Rate Limits and Testing-` API-Football's rate limits initially restricted the number of requests I could make, making thorough testing difficult. To overcome this, I opted to purchase a membership, which provided a higher request limit, allowing me to perform more extensive tests.

- `Loading the Current Fixture List-` Ensuring the current fixure list was displayed correctly was a challenge. I had to ensure all fixtures were complete before moving onto the next round which required handling data dependencies and making sure the state was updated after each map result.

- `Deployment Issues-` During deployment on Vercel for the first time, I faced multiple build errors due to environment variable configuration. This was resolved by properly setting up .env.local and configuring the variables in Vercel's dashboard.