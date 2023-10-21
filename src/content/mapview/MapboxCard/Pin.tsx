import zIndex from '@mui/material/styles/zIndex';
import * as React from 'react';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none',
  zIndex: 5,
};

function Pin({radius = 20}) { 
  let r = radius * 200;
  r = r > 4 ? r : 4;
  return (
    <svg height={r*2} viewBox={`0 0 ${r*2} ${r*2}`} style={pinStyle}>
      {/* <path d={ICON} /> */}
      <circle cx={r} cy={r} r={r} stroke="black" width="3" fill="red" />
    </svg>
  );
}

export default React.memo(Pin);