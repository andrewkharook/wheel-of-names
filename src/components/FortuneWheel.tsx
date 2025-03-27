import { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { TeamMember } from '../App';

interface FortuneWheelProps {
  teamMembers: TeamMember[];
  onSpinComplete: () => void;
}

const FortuneWheel = ({ teamMembers, onSpinComplete }: FortuneWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [innerRotation, setInnerRotation] = useState(0);
  const [outerRotation, setOuterRotation] = useState(0);
  const wheelRef = useRef<SVGSVGElement>(null);

  const spinWheel = () => {
    if (isSpinning || teamMembers.length === 0) return;

    setIsSpinning(true);
    const spins = 5; // Number of full rotations
    const extraDegrees = Math.random() * 360; // Random final position
    const totalInnerDegrees = spins * 360 + extraDegrees;
    const totalOuterDegrees = -(spins * 360 + Math.random() * 360); // Opposite direction, random stop position
    
    // Calculate the selected member based on where the wheel stops
    const degreesPerMember = 360 / teamMembers.length;
    const finalPosition = extraDegrees;
    const selectedIndex = Math.floor(
      (360 - (finalPosition % 360)) / degreesPerMember
    );

    setInnerRotation(prev => prev + totalInnerDegrees);
    setOuterRotation(prev => prev + totalOuterDegrees);

    setTimeout(() => {
      setIsSpinning(false);
      console.log('Selected:', teamMembers[selectedIndex].name);
      onSpinComplete();
    }, 5000);
  };

  if (teamMembers.length === 0) {
    return (
      <Box
        sx={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          border: '2px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Add team members in settings to start spinning the wheel
        </Typography>
      </Box>
    );
  }

  const innerRadius = 200; // Inner wheel radius
  const outerRadius = 220; // Outer wheel radius
  const center = outerRadius; // Center point
  const degreesPerMember = 360 / teamMembers.length;
  const degreesPerOuterSector = 36; // 360 / 10 sectors

  return (
    <Box sx={{ 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
    }}>
      {/* Pointer */}
      <Box
        sx={{
          position: 'absolute',
          top: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderTop: '40px solid #f50057',
          zIndex: 1,
        }}
      />
      
      {/* Wheel Container */}
      <svg
        ref={wheelRef}
        width={outerRadius * 2}
        height={outerRadius * 2}
        viewBox={`0 0 ${outerRadius * 2} ${outerRadius * 2}`}
        onClick={spinWheel}
        style={{
          cursor: 'pointer',
        }}
      >
        {/* Outer Wheel */}
        <g
          style={{
            transform: `rotate(${outerRotation}deg)`,
            transition: isSpinning
              ? 'transform 5.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
              : 'none',
            transformOrigin: 'center',
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => {
            const startAngle = (degreesPerOuterSector * index * Math.PI) / 180;
            const endAngle = (degreesPerOuterSector * (index + 1) * Math.PI) / 180;
            
            const startX = center + outerRadius * Math.cos(startAngle);
            const startY = center + outerRadius * Math.sin(startAngle);
            const endX = center + outerRadius * Math.cos(endAngle);
            const endY = center + outerRadius * Math.sin(endAngle);
            
            const innerStartX = center + innerRadius * Math.cos(startAngle);
            const innerStartY = center + innerRadius * Math.sin(startAngle);
            const innerEndX = center + innerRadius * Math.cos(endAngle);
            const innerEndY = center + innerRadius * Math.sin(endAngle);
            
            const pathData = [
              `M ${innerStartX},${innerStartY}`,
              `L ${startX},${startY}`,
              `A ${outerRadius},${outerRadius} 0 0,1 ${endX},${endY}`,
              `L ${innerEndX},${innerEndY}`,
              `A ${innerRadius},${innerRadius} 0 0,0 ${innerStartX},${innerStartY}`,
              'Z'
            ].join(' ');

            // Add star text only to the first sector
            const textAngle = startAngle + (endAngle - startAngle) / 2;
            const textRadius = (innerRadius + outerRadius) / 2;
            const textX = center + textRadius * Math.cos(textAngle);
            const textY = center + textRadius * Math.sin(textAngle);
            const textRotation = (textAngle * 180) / Math.PI + 90;

            return (
              <g key={index}>
                <path
                  d={pathData}
                  fill={index === 0 ? '#fffccf' : 'transparent'}
                  stroke="white"
                  strokeWidth="1"
                />
                {index === 0 && (
                  <text
                    x={textX}
                    y={textY}
                    fontSize="24"
                    textAnchor="middle"
                    transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                  >
                    ⭐️
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Inner Wheel */}
        <g
          style={{
            transform: `rotate(${innerRotation}deg)`,
            transition: isSpinning
              ? 'transform 5s cubic-bezier(0.2, 0.8, 0.2, 1)'
              : 'none',
            transformOrigin: 'center',
          }}
        >
          {teamMembers.map((member, index) => {
            const startAngle = (degreesPerMember * index * Math.PI) / 180;
            const endAngle = (degreesPerMember * (index + 1) * Math.PI) / 180;
            
            const startX = center + innerRadius * Math.cos(startAngle);
            const startY = center + innerRadius * Math.sin(startAngle);
            const endX = center + innerRadius * Math.cos(endAngle);
            const endY = center + innerRadius * Math.sin(endAngle);
            
            const largeArcFlag = degreesPerMember <= 180 ? 0 : 1;
            
            const pathData = [
              `M ${center},${center}`,
              `L ${startX},${startY}`,
              `A ${innerRadius},${innerRadius} 0 ${largeArcFlag},1 ${endX},${endY}`,
              'Z'
            ].join(' ');

            // Calculate text position
            const textAngle = startAngle + (endAngle - startAngle) / 2;
            const textRadius = innerRadius * 0.65;
            const textX = center + textRadius * Math.cos(textAngle);
            const textY = center + textRadius * Math.sin(textAngle);
            const textRotation = (textAngle * 180) / Math.PI + 90;

            return (
              <g key={member.id}>
                <path
                  d={pathData}
                  fill={member.color}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={textX}
                  y={textY}
                  fill="rgba(0, 0, 0, 0.7)"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                >
                  {member.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: '1rem',
          color: 'text.secondary',
          mt: 2,
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>⭐️</span> = Імунітет від проведення дейліків до кінця спринта
      </Typography>
    </Box>
  );
};

export default FortuneWheel; 