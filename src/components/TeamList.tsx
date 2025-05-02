'use client';

import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  Paper,
  List,
  ListItem,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Team {
  id: string;
  name: string;
  playerCount: number;
  region: string;
  country: string;
  playerIds: number[];
}

const LOCAL_KEY = 'my_teams';

const TeamList = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [form, setForm] = useState({ name: '', region: '', country: '', playerCount: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setTeams(JSON.parse(saved));
  }, []);

  const saveTeams = (teams: Team[]) => {
    setTeams(teams);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(teams));
  };

  const handleOpenModal = (team?: Team) => {
    if (team) {
      setForm({ name: team.name, region: team.region, country: team.country, playerCount: String(team.playerCount) });
      setEditingTeam(team);
    } else {
      setForm({ name: '', region: '', country: '', playerCount: '' });
      setEditingTeam(null);
    }
    setError('');
    setShowModal(true);
  };

  const handleSubmit = () => {
    const { name, region, country, playerCount } = form;
    if (!name.trim() || !region.trim() || !country.trim() || !playerCount.trim()) {
      setError('All fields are required');
      return;
    }

    const isDuplicate = teams.some(
      (t) => t.name.toLowerCase() === name.toLowerCase() && t.id !== editingTeam?.id
    );
    if (isDuplicate) {
      setError('Team name must be unique');
      return;
    }

    const newTeam: Team = {
      id: editingTeam ? editingTeam.id : uuidv4(),
      name,
      region,
      country,
      playerCount: parseInt(playerCount),
      playerIds: editingTeam?.playerIds || [],
    };

    const updatedTeams = editingTeam
      ? teams.map((t) => (t.id === editingTeam.id ? newTeam : t))
      : [...teams, newTeam];

    saveTeams(updatedTeams);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    const updated = teams.filter((t) => t.id !== id);
    saveTeams(updated);
  };

  return (
    <Box mt={5} px={{ xs: 2, sm: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={2}>
        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Teams
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
          sx={{ mt: { xs: 1, sm: 0 }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
        >
          + Add Team
        </Button>
      </Box>

      {teams.length === 0 ? (
        <Typography>No teams yet</Typography>
      ) : (
        <List component={Paper} variant="outlined">
          {teams.map((team) => (
            <ListItem
              key={team.id}
              divider
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                px: 2,
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">{team.name}</Typography>
                <Typography variant="body2">
                  {team.region}, {team.country}
                </Typography>
                <Typography variant="caption">{team.playerCount} players</Typography>
              </Box>
              <Box mt={{ xs: 1, sm: 0 }}>
                <IconButton onClick={() => handleOpenModal(team)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(team.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      {/* Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          component={Paper}
          p={3}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: { xs: '90%', sm: 400 },
            transform: 'translate(-50%, -50%)',
            outline: 'none',
          }}
        >
          <Typography variant="h6" mb={2} sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {editingTeam ? 'Edit Team' : 'Add New Team'}
          </Typography>

          <TextField
            fullWidth
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Region"
            value={form.region}
            onChange={(e) => setForm({ ...form, region: e.target.value })}
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Player Count"
            type="number"
            value={form.playerCount}
            onChange={(e) => setForm({ ...form, playerCount: e.target.value })}
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            margin="normal"
            size="small"
          />

          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}

          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={() => setShowModal(false)} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="success">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TeamList;
