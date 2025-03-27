import { Box, IconButton, Typography } from '@mui/material';
import { Settings as SettingsIcon, CameraAlt as CameraIcon } from '@mui/icons-material';
import { TeamMember, SpinStats } from '../App';
import FortuneWheel from '../components/FortuneWheel';

interface WheelPageProps {
  teamMembers: TeamMember[];
  spinStats: SpinStats;
  onSettingsClick: () => void;
  onSpinComplete: () => void;
  onScreenshot: () => void;
}

const WheelPage = ({ teamMembers, spinStats, onSettingsClick, onSpinComplete, onScreenshot }: WheelPageProps) => {
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

      <FortuneWheel teamMembers={teamMembers} onSpinComplete={onSpinComplete} />

      {spinStats.count > 0 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Кількість запусків: {spinStats.count} / Останній запуск: {spinStats.lastSpinTime}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WheelPage; 