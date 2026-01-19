import React from 'react';

interface ResponsiveLogoProps {
  src: string;
  alt?: string;
  maxWidth?: string;
  className?: string;
}

const ResponsiveLogo: React.FC<ResponsiveLogoProps> = ({ 
  src, 
  alt = "Fertigo Logo",
  maxWidth = "800px",
  className = ""
}) => {
  return (
    <div className="logo-container">
      <img 
        src={src} 
        alt={alt} 
        className={`responsive-logo sharpen-image ${className}`}
        style={{
          maxWidth: maxWidth
        }}
      />
    </div>
  );
};

export default ResponsiveLogo;
