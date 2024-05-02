import * as React from 'react';
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 12h12m0 0-5-5m5 5-5 5"
    />
  </svg>
);
export default SvgComponent;
