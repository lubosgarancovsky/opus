import * as React from 'react';
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon glyph" viewBox="0 0 24 24" {...props}>
    <rect fill="currentColor" width={9} height={11} x={2} y={2} rx={2} />
    <rect fill="currentColor" width={9} height={7} x={13} y={2} rx={2} />
    <rect fill="currentColor" width={9} height={7} x={2} y={15} rx={2} />
    <rect fill="currentColor" width={9} height={11} x={13} y={11} rx={2} />
  </svg>
);
export default SvgComponent;
