// Import React and data
import React from 'react';
import { teamName } from '../data/teamRoster';
import teamSchedule from '../data/teamSchedule';

// Define ViewSchedule component
const ViewSchedule = () => {
  // Filter schedule by team name
  // teamGames will hold an array of game objects
  // where teamName is equal to home or away team
  const teamGames = teamSchedule.filter(function (game) {
    // Anonymous function passed as an argument to the .filter() method. 
    // Callback function called for each element in the teamSchedule 
    return game.homeTeam === teamName || game.awayTeam === teamName;
  });

  // Render method: beginning of JSX code rendered by component
  return (
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/ViewStyles.css" />
      </head>
      <body>
        <h1>{teamName} Game Schedule</h1>
        <table>
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Game Date</th>
            </tr>
          </thead>
          <tbody>
            {/*  iterate over each game object in teamGames */}
            {teamGames.map((game) => {
              return (
                // Assign unique key prop to each table row
                <tr key={game.gameId}>
                  <td>{game.gameId}</td>
                  <td>{game.homeTeam}</td>
                  <td>{game.awayTeam}</td>
                  <td>{game.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </body>
    </html>
  );
};

export default ViewSchedule;