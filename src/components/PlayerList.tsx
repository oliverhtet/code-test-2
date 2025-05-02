'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string | null;
  national_team: string | null;
  height: number | null;
  weight: number | null;
  birth_date: string | null;
  age: number | null;
  team_ids: number[];
}

const PlayerList: React.FC = () => {
  const players = useSelector((state: RootState) => state.players.players);

  return (
    <div style={{ overflowX: 'auto' }}>
      {players.length > 0 ? (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          minWidth: '600px'
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Position</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>National Team</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Height (cm)</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Weight (kg)</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Birth Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Age</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Team ID(s)</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{player.first_name} {player.last_name}</td>
                <td style={{ padding: '12px' }}>{player.position || 'N/A'}</td>
                <td style={{ padding: '12px' }}>{player.national_team || 'N/A'}</td>
                <td style={{ padding: '12px' }}>{player.height || 'N/A'}</td>
                <td style={{ padding: '12px' }}>{player.height || 'N/A'}</td>
                <td style={{ padding: '12px' }}>
                  {player.birth_date ? new Date(player.birth_date).toLocaleDateString() : 'N/A'}
                </td>
                <td style={{ padding: '12px' }}>{player.age || 'N/A'}</td>
                <td style={{ padding: '12px' }}>
                  {player.team_ids && player.team_ids.length > 0 ? player.team_ids.join(', ') : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading players...</p>
      )}
    </div>
  );
};

export default PlayerList;
