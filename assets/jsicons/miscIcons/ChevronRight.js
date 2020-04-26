import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function ChevronRight(props) {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

  const ChevronRight = () => (
    <SvgXml xml={xml} width='24' height='24' />
  );
  return <ChevronRight />;
}
