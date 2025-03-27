import { Box, IconButton } from '@mui/material';
import { Settings as SettingsIcon, CameraAlt as CameraIcon } from '@mui/icons-material';
import { TeamMember } from '../App';
import FortuneWheel from '../components/FortuneWheel';

interface WheelPageProps {
  teamMembers: TeamMember[];
  onSettingsClick: () => void;
  onScreenshot: () => void;
}

const WheelPage = ({ teamMembers, onSettingsClick, onScreenshot }: WheelPageProps) => {
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
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <IconButton onClick={onSettingsClick}>
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={onScreenshot}>
          <CameraIcon />
        </IconButton>
      </Box>
      
      <FortuneWheel teamMembers={teamMembers} />
    </Box>
  );
};

export default WheelPage; 