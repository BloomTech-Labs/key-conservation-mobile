import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function LargeCrossCircle(props) {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34"><g id="Group_6717" data-name="Group 6717" transform="translate(0 496)"><path id="Path_21487" data-name="Path 21487" d="M17-496A17,17,0,0,0,0-479a17,17,0,0,0,17,17,17,17,0,0,0,17-17A17,17,0,0,0,17-496Zm0,30.71A13.706,13.706,0,0,1,3.29-479,13.706,13.706,0,0,1,17-492.71,13.706,13.706,0,0,1,30.71-479,13.706,13.706,0,0,1,17-465.29Zm6.978-17.973L19.715-479l4.264,4.264a.823.823,0,0,1,0,1.165l-1.549,1.549a.823.823,0,0,1-1.165,0L17-476.285l-4.264,4.264a.823.823,0,0,1-1.165,0l-1.549-1.549a.823.823,0,0,1,0-1.165L14.285-479l-4.264-4.264a.823.823,0,0,1,0-1.165l1.549-1.549a.823.823,0,0,1,1.165,0L17-481.715l4.264-4.264a.823.823,0,0,1,1.165,0l1.549,1.549A.823.823,0,0,1,23.978-483.264Z" fill="#555"/></g></svg>`;

  const LargeCrossCircle = () => (
    <SvgXml xml={xml} width="25" height="25" fill="#D7FF43" {...props} />
  );

  return <LargeCrossCircle />;
}
