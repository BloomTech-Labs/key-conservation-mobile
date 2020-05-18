import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function StopButton(props) {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
  <g id="Group_6716" data-name="Group 6716" transform="translate(0 496)">
    <path id="Path_21486" data-name="Path 21486" d="M34-479a17,17,0,0,0-17-17A17,17,0,0,0,0-479a17,17,0,0,0,17,17A17,17,0,0,0,34-479ZM3.29-479A13.706,13.706,0,0,1,17-492.71,13.706,13.706,0,0,1,30.71-479,13.706,13.706,0,0,1,17-465.29,13.706,13.706,0,0,1,3.29-479Zm20.29-5.484v10.968a1.1,1.1,0,0,1-1.1,1.1H11.516a1.1,1.1,0,0,1-1.1-1.1v-10.968a1.1,1.1,0,0,1,1.1-1.1H22.484A1.1,1.1,0,0,1,23.581-484.484Z" fill="#505050"/>
  </g>
</svg>`;

  const StopButton = () => (
    <SvgXml xml={xml} width="25" height="25" fill="#D7FF43" {...props} />
  );

  return <StopButton />;
}
