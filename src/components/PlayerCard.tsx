'use client';

import { useDispatch } from 'react-redux';
import addPlayerToTeam  from '@/store/teamsSlice';

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  team: {
    full_name: string;
  };
}

const PlayerCard = ({ player }: { player: Player }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addPlayerToTeam(player));
  };

  return (
    <div className="border p-4 mb-2">
      <p>
        {player.first_name} {player.last_name}
      </p>
      <p>{player.team.full_name}</p>
      <button onClick={handleAdd} className="mt-2 px-2 py-1 bg-green-500 text-white">
        Add to Team
      </button>
    </div>
  );
};

export default PlayerCard;
