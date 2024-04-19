import React from 'react';
import { teamRoster, teamName } from '../data/teamRoster';

const ViewRoster = () => {
  return (
    <div>
      <h2>{teamName} Roster</h2>
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
    </div>
  );
};

export default ViewRoster;