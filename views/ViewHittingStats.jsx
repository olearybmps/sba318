// Import React and data
import React from 'react';
import { teamRoster, teamName } from '../data/teamRoster';
import hittingStats from '../data/hittingStats';

// Helper function to remove zero to left of decimal for batting average
function stripZero(numStr) {
  return numStr[0] === "0" ? numStr.slice(1) : numStr;
}

// Definie ViewHittingStats functional component
const ViewHittingStats = () => {
  // Defines helper function getPlayerStats which takes playerId as input 
  // and returns hitting statistics for player from hittingStats array.
  const getPlayerStats = (playerId) => {
    return hittingStats.find((stats) => stats.playerId === playerId);
  };

  // Render method: beginning of JSX code rendered by component
  return (
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/ViewStyles.css" />
      </head>
      <body>
        <h1>{teamName} Player Statistics: Hitting</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Player Name</th>
              <th>Batting Average</th>
              <th>At Bats</th>
              <th>Hits</th>
              <th>Home Runs</th>
              <th>Walks</th>
              <th>Strikeouts</th>
            </tr>
          </thead>
          <tbody>
            {/* Iterate over each player object in teamRoster.
                Retrieve hitting stats for each player using getPlayerStats function.
                Skips rendering if no stats are found for player (if (!playerStats) return null;). */}
            {teamRoster.map((player) => {
              const playerStats = getPlayerStats(player.id);
              if (!playerStats) return null;

              return (
                // Assign unique key prop to each table row
                <tr key={player.id}>
                  <td>{player.id}</td>
                  <td>{player.name}</td>
                  <td className='rt'>{stripZero((playerStats.hits / playerStats.atBats).toFixed(3))}</td>
                  <td className='rt'>{playerStats.atBats}</td>
                  <td className='rt'>{playerStats.hits}</td>
                  <td className='rt'>{playerStats.homeRuns}</td>
                  <td className='rt'>{playerStats.walks}</td>
                  <td className='rt'>{playerStats.strikeouts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </body>
    </html>
  );
};

export default ViewHittingStats;