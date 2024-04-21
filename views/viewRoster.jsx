// Import React and data
import React from 'react';
import { teamRoster, teamName } from '../data/teamRoster';

// Define ViewRoster functional component
const ViewRoster = () => {
  // Render method: beginning of JSX code rendered by component
  return (
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/ViewStyles.css" />
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
            {/* Iterate over each player object in teamRoster.
                Generate table row (<tr>) for each player, 
                populate  (<td>) cells with player ID, name, and age. */}
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