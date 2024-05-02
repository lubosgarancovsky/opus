import React from 'react';

interface DataSectionProps {}

export const DataSectionTitle = ({ children }) => {
  return <h3>{children}</h3>;
};

export const DataSectionContent = ({ children }) => {
  return <div>{children}</div>;
};

export const DataSection: React.FC<DataSectionProps> = ({ children }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};
