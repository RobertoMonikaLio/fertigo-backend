
import React from 'react';

// This component is obsolete as navigation has been moved to PartnerHeader.
// It is kept to avoid breaking imports in files that might not have been updated yet.
const PartnerSidebar: React.FC<{ isMobileOpen: boolean; setMobileOpen: (isOpen: boolean) => void; }> = () => {
    return null;
};

export default PartnerSidebar;