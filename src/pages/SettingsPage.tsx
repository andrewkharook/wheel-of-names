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
        bgcolor: '#f5f5f5',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          overflow: 'hidden',
        }}
      >
        <Paper
          sx={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 3,
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
          </Box>

          <Box
            sx={{
              p: 3,
              pt: 2,
              borderTop: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
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
              fullWidth
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SettingsPage; 