import React from 'react';
import { teamRoster, teamName } from '../data/teamRoster';

const ViewRoster = () => {
  return (
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/ViewRoster.css" />
      </head>
      <body>
        <h1>{teamName} Roster</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Player Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {teamRoster.map((player) => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </body>
    </html>
  );
};

export default ViewRoster;