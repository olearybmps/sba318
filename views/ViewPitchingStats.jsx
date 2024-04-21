// Import React and data
import React from 'react';
import { teamRoster, teamName } from '../data/teamRoster';
import pitchingStats from '../data/pitchingStats';

// Define ViewPitchingStats functional component
const ViewPitchingStats = () => {
  // Defines helper function getPlayerStats that takes playerId as input 
  // and returns pitching statistics for player from pitchingStats array.
  const getPlayerStats = (playerId) => {
    return pitchingStats.find((stats) => stats.playerId === playerId);
  };

  // Render method: beginning of JSX code rendered by component
  return (
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/ViewStyles.css" />
      </head>
      <body>
        <h1>{teamName} Player Statistics: Pitching</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Player Name</th>
              <th>Earned Run Average</th>
              <th>Runs Allowed</th>
              <th>Innings Pictched</th>
              <th>Strikeouts</th>
              <th>Walks</th>
            </tr>
          </thead>
          <tbody>
            {/* Iterate over each player object in teamRoster.
                Retrieve pitching stats for each player using getPlayerStats function.
                Skps rendering if no stats found for player (if (!playerStats) return null;). */}
            {teamRoster.map((player) => {
              const playerStats = getPlayerStats(player.id);
              if (!playerStats) return null;

              return (
                // Assign unique key prop to each table row
                <tr key={player.id}>
                  <td>{player.id}</td>
                  <td>{player.name}</td>
                  <td className='rt'>{playerStats.era}</td>
                  <td className='rt'>{playerStats.runsAllowed}</td>
                  <td className='rt'>{playerStats.inningsPitched}</td>
                  <td className='rt'>{playerStats.strikeouts}</td>
                  <td className='rt'>{playerStats.walks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </body>
    </html>
  );
};

export default ViewPitchingStats;