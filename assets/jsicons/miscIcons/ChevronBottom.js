import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function ChevronBottom(props) {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

  const ChevronBottom = () => <SvgXml xml={xml} width="24" height="24" />;
  return <ChevronBottom />;
}
