'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTeam, updateTeam } from '../store/teamsSlice';

const TeamModal = ({ team, closeModal }: { team: any, closeModal: () => void }) => {
  const [teamName, setTeamName] = useState(team ? team.name : '');
  const [teamPlayers, setTeamPlayers] = useState(team ? team.players : []);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (team) {
      dispatch(updateTeam({ ...team, name: teamName, players: teamPlayers }));
    } else {
      dispatch(createTeam({
        id: Date.now().toString(), name: teamName, players: teamPlayers,
        playerCount: 0,
        region: '',
        country: ''
      }));
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">{team ? 'Edit Team' : 'Create New Team'}</h2>

        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {/* You can add player input if needed */}

        <div className="flex justify-end space-x-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
