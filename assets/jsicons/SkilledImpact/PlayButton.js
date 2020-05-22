import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function PlayButton(props) {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
  <g id="Group_6715" data-name="Group 6715" transform="translate(0 496)">
    <path id="Path_21485" data-name="Path 21485" d="M24.931-480.234l-12.065-7.335a1.648,1.648,0,0,0-2.447,1.44v14.258a1.649,1.649,0,0,0,2.447,1.439l12.065-6.923A1.65,1.65,0,0,0,24.931-480.234ZM34-479a17,17,0,0,0-17-17A17,17,0,0,0,0-479a17,17,0,0,0,17,17A17,17,0,0,0,34-479ZM3.29-479A13.706,13.706,0,0,1,17-492.71,13.706,13.706,0,0,1,30.71-479,13.706,13.706,0,0,1,17-465.29,13.706,13.706,0,0,1,3.29-479Z" transform="translate(0 0)" fill="#505050"/>
  </g>
</svg>`;

  const PlayButton = () => (
    <SvgXml xml={xml} width="25" height="25" fill="#D7FF43" {...props} />
  );

  return <PlayButton />;
}
