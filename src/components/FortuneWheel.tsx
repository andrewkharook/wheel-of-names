import { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { TeamMember } from '../App';

interface FortuneWheelProps {
  teamMembers: TeamMember[];
}

const FortuneWheel = ({ teamMembers }: FortuneWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<SVGSVGElement>(null);

  const spinWheel = () => {
    if (isSpinning || teamMembers.length === 0) return;

    setIsSpinning(true);
    const spins = 5; // Number of full rotations
    const extraDegrees = Math.random() * 360; // Random final position
    const totalDegrees = spins * 360 + extraDegrees;
    
    // Calculate the selected member based on where the wheel stops
    const degreesPerMember = 360 / teamMembers.length;
    const finalPosition = extraDegrees;
    const selectedIndex = Math.floor(
      (360 - (finalPosition % 360)) / degreesPerMember
    );

    setRotation(prevRotation => prevRotation + totalDegrees);

    setTimeout(() => {
      setIsSpinning(false);
      console.log('Selected:', teamMembers[selectedIndex].name);
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

  const radius = 200; // SVG radius
  const center = radius; // Center point
  const degreesPerMember = 360 / teamMembers.length;

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Pointer */}
      <Box
        sx={{
          position: 'absolute',
          top: -20,
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
      
      {/* Wheel */}
      <svg
        ref={wheelRef}
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        onClick={spinWheel}
        style={{
          cursor: 'pointer',
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning
            ? 'transform 5s cubic-bezier(0.2, 0.8, 0.2, 1)'
            : 'none',
        }}
      >
        <g>
          {teamMembers.map((member, index) => {
            const startAngle = (degreesPerMember * index * Math.PI) / 180;
            const endAngle = (degreesPerMember * (index + 1) * Math.PI) / 180;
            
            const startX = center + radius * Math.cos(startAngle);
            const startY = center + radius * Math.sin(startAngle);
            const endX = center + radius * Math.cos(endAngle);
            const endY = center + radius * Math.sin(endAngle);
            
            const largeArcFlag = degreesPerMember <= 180 ? 0 : 1;
            
            const pathData = [
              `M ${center},${center}`,
              `L ${startX},${startY}`,
              `A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY}`,
              'Z'
            ].join(' ');

            // Calculate text position
            const textAngle = startAngle + (endAngle - startAngle) / 2;
            const textRadius = radius * 0.65; // Position text at 65% of radius
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
    </Box>
  );
};

export default FortuneWheel; 