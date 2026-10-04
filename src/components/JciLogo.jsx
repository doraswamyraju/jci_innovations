import React from 'react';

export default function JciLogo({ height = 50, className = '', isDark = false }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }} className={className}>
      <img 
        src="/logo.png" 
        alt="JCI Tirupati Innovations" 
        style={{
          height: `${height}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
}
