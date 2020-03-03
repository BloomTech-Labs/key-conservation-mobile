import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function SmallPlus(props) {
  const smallPlus = `

    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="90" height="90" fill="#fff"/>
<circle cx="45" cy="45" r="45" />
<path d="M32.5208 47.0469H42.9375V57.3594C42.9375 57.6443 43.1706 57.875 43.4583 57.875H45.5417C45.8294 57.875 46.0625 57.6443 46.0625 57.3594V47.0469H56.4792C56.7669 47.0469 57 46.8161 57 46.5312V44.4688C57 44.1839 56.7669 43.9531 56.4792 43.9531H46.0625V33.6406C46.0625 33.3557 45.8294 33.125 45.5417 33.125H43.4583C43.1706 33.125 42.9375 33.3557 42.9375 33.6406V43.9531H32.5208C32.2331 43.9531 32 44.1839 32 44.4688V46.5312C32 46.8161 32.2331 47.0469 32.5208 47.0469Z" fill="white"/>
</svg>

    `;

  const SmallPlus = () => (
    <SvgXml xml={smallPlus} width='90' height='90' fill='#CFFF4F' {...props} />
  );

  return <SmallPlus />;
}
