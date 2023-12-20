import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
}

// Layout for placing a component fixed at the center of the screen.
const CenterAlignedContainer : React.FC<Props> = ({ children }) => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ color: "white" }}>
      {children}
    </div>
  );
};

export default CenterAlignedContainer;
