import React from 'react';
import { teamRoster, teamName } from '../data/teamRoster';
import hittingStats from '../data/hittingStats';

function stripZero(numStr) {
  return numStr[0] === "0" ? numStr.slice(1) : numStr;
}

const ViewHittingStats = () => {
  const getPlayerStats = (playerId) => {
    return hittingStats.find((stats) => stats.playerId === playerId);
  };

  return (
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/ViewRoster.css" />
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
            {teamRoster.map((player) => {
              const playerStats = getPlayerStats(player.id);
              if (!playerStats) return null;

              return (
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