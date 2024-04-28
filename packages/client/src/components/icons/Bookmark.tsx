import * as React from 'react';
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 0 30 30" {...props}>
    <title>{'bookmark'}</title>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M18 0H4a4 4 0 0 0-4 4v22a4 4 0 0 0 4 4l7-7 7 7a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4"
    />
  </svg>
);
export default SvgComponent;
