import { Box, Tooltip, Typography } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import * as React from 'react';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none',
  // zIndex: 5,
};

function Pin({size = 20, color='blue', tooltipText='', selected=false, labelText='', labelVisible = true }) { 
  const strokeWidth = selected ? 3 : 1;
  let r = size;
  r = r > 8 ? r : 8; // minimum value

  const pp = tooltipText.split(/\\n/g);
  const tooltipTextJsx = (
    <div>
      {pp.map((line, index) => ( 
        <div key={index}>
          {line}
        </div>
      ))}
    </div>
  );

  return (
    <Tooltip title={tooltipTextJsx} placement="top" disableInteractive>
      <div>
        <svg height={(r + strokeWidth)*2} viewBox={`0 0 ${(r + strokeWidth)*2} ${(r + strokeWidth)*2}`} style={pinStyle}>
          {/* <path d={ICON} /> */}
          <circle cx={r + strokeWidth} cy={r + strokeWidth} r={r} fill={'#00000000'} stroke={selected?'#00000000':'#00000000'} strokeWidth={strokeWidth}/>
        </svg>
        {
          labelVisible ? (
            <Typography color='white' textAlign={'center'} fontSize={'14px'} lineHeight={'16px'} style={{position:'absolute', top: (r + strokeWidth)*2 + 2, width: '100%'}}>
              {labelText}
            </Typography>
          ) : <></>
        }
      </div>      
    </Tooltip>
  );
}

// function Pin({size = 20, color='blue', tooltipText='', selected=false, labelText='', labelVisible = true }) { 
//   const strokeWidth = selected ? 3 : 1;
//   let r = size;
//   r = r > 8 ? r : 8; // minimum value

//   const pp = tooltipText.split(/\\n/g);
//   const tooltipTextJsx = (
//     <div>
//       {pp.map((line, index) => ( 
//         <div key={index}>
//           {line}
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <Tooltip title={tooltipTextJsx} placement="top" disableInteractive>
//       <Box>
//         <svg height={(r + strokeWidth)*2} viewBox={`0 0 ${(r + strokeWidth)*2} ${(r + strokeWidth)*2}`} style={pinStyle}>
//           {/* <path d={ICON} /> */}
//           <circle cx={r + strokeWidth} cy={r + strokeWidth} r={r} fill={color} stroke={selected?'white':'black'} strokeWidth={strokeWidth}/>
//         </svg>
//         {
//           labelVisible ? (
//             <Typography color='white' textAlign={'center'} fontSize={'14px'} lineHeight={'16px'} style={{position:'absolute', top: (r + strokeWidth)*2, width: '100%'}}>
//               {labelText}
//             </Typography>
//           ) : <></>
//         }
//       </Box>      
//     </Tooltip>
//   );
// }

export default React.memo(Pin);