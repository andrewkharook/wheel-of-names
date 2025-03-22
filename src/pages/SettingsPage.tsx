import { useState } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  IconButton,
  Paper,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { TeamMember } from '../App';

interface SettingsPageProps {
  teamMembers: TeamMember[];
  onSave: (members: TeamMember[]) => void;
}

const generateRandomColor = () => {
  const hue = Math.random() * 360;
  return `hsl(${hue}, 70%, 80%)`;
};

const SettingsPage = ({ teamMembers, onSave }: SettingsPageProps) => {
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);

  const handleAddMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: '',
      color: generateRandomColor(),
    };
    setMembers([...members, newMember]);
  };

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const handleNameChange = (id: string, newName: string) => {
    setMembers(
      members.map(member =>
        member.id === id ? { ...member, name: newName } : member
      )
    );
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        bgcolor: '#f5f5f5',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: 600,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <List>
          {members.map((member) => (
            <ListItem
              key={member.id}
              sx={{
                gap: 2,
                mb: 1,
              }}
            >
              <TextField
                fullWidth
                value={member.name}
                onChange={(e) => handleNameChange(member.id, e.target.value)}
                placeholder="Enter team member name"
                size="small"
              />
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  bgcolor: member.color,
                }}
              />
              <IconButton
                onClick={() => handleRemoveMember(member.id)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Button
          startIcon={<AddIcon />}
          onClick={handleAddMember}
          variant="outlined"
          sx={{ alignSelf: 'flex-start' }}
        >
          Add Member
        </Button>

        <Button
          onClick={() => onSave(members)}
          variant="contained"
          disabled={members.some(member => !member.name.trim())}
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </Paper>
    </Box>
  );
};

export default SettingsPage; 