import * as React from 'react';
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      fill="url(#a)"
      fillRule="evenodd"
      d="M38 .775C16.378 4.769 0 23.722 0 46.5c0 22.778 16.378 41.731 38 45.725v-9.327C21.915 78.878 10 64.33 10 47c0-17.33 11.915-31.878 28-35.898V.775Zm17 82.358C71.589 79.477 84 64.688 84 47c0-17.688-12.411-32.477-29-36.133V.775C76.622 4.769 93 23.722 93 46.5c0 22.778-16.378 41.731-38 45.725v-9.092Z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient id="a" x1={93} x2={0} y1={44} y2={43.5} gradientUnits="userSpaceOnUse">
        <stop stopColor="#E31313" />
        <stop offset={0.135} stopColor="#F91C79" />
        <stop offset={0.845} stopColor="#EF8F1E" />
        <stop offset={1} stopColor="#FFF623" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgComponent;
