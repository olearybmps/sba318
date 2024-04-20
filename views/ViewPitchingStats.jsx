import React from 'react';
import { teamRoster, teamName } from '../data/teamRoster';
import pitchingStats from '../data/pitchingStats';

const ViewPitchingStats = () => {
  const getPlayerStats = (playerId) => {
    return pitchingStats.find((stats) => stats.playerId === playerId);
  };

  return (
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/ViewRoster.css" />
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
            {teamRoster.map((player) => {
              const playerStats = getPlayerStats(player.id);
              if (!playerStats) return null;

              return (
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