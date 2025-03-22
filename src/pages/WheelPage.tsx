import { Box, IconButton } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { TeamMember } from '../App';
import FortuneWheel from '../components/FortuneWheel';

interface WheelPageProps {
  teamMembers: TeamMember[];
  onSettingsClick: () => void;
}

const WheelPage = ({ teamMembers, onSettingsClick }: WheelPageProps) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bgcolor: '#f5f5f5',
      }}
    >
      <IconButton
        onClick={onSettingsClick}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
      >
        <SettingsIcon />
      </IconButton>
      
      <FortuneWheel teamMembers={teamMembers} />
    </Box>
  );
};

export default WheelPage; 