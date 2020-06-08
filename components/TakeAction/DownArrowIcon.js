import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function DownArrow() {
  return <SvgXml xml=
    {`
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="43" height="43" viewBox="0 0 43 43">
        <defs>
          <clipPath id="clip-path">
            <rect width="43" height="43" fill="none"/>
          </clipPath>
        </defs>
        <g id="Symbol_49" data-name="Symbol 49" clip-path="url(#clip-path)">
          <path id="ic_expand_more_24px" d="M19.237,8.59,13.5,14.315,7.762,8.59,6,10.352l7.5,7.5,7.5-7.5Z" transform="translate(8 8.41)" fill="rgba(0,0,0,0.8)"/>
          <rect id="Rectangle_2276" data-name="Rectangle 2276" width="43" height="43" fill="none"/>
        </g>
      </svg>
    `} 
    width='45' height='45' />

}