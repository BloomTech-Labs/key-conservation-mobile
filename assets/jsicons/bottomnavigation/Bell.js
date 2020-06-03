import React from "react";
import { SvgXml } from "react-native-svg";

export default function Bell() {

  const globeA = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
  preserveAspectRatio="xMidYMid meet">
 <metadata>
 Created by potrace 1.16, written by Peter Selinger 2001-2019
 </metadata>
 <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
 fill="#333333" stroke="none">
 <path d="M2477 4466 c-84 -31 -139 -98 -153 -184 -6 -40 -6 -40 -68 -51 -171
 -33 -349 -112 -489 -217 -188 -141 -330 -363 -399 -624 -12 -47 -25 -87 -29
 -90 -4 -3 -8 -23 -8 -45 0 -22 -5 -74 -11 -115 -6 -41 -15 -212 -20 -380 -12
 -402 -35 -589 -97 -784 -76 -243 -182 -385 -452 -606 l-104 -85 956 -3 c526
 -1 1387 -1 1913 0 l957 3 -109 90 c-257 212 -363 352 -439 580 -67 197 -93
 401 -105 805 -8 283 -25 466 -50 561 -6 22 -8 44 -5 50 4 5 2 16 -4 22 -5 7
 -24 53 -42 103 -83 236 -226 430 -411 555 -121 82 -325 164 -461 184 -44 7
 -47 9 -47 36 0 68 -52 144 -125 181 -50 26 -147 33 -198 14z"/>
 <path d="M2050 1050 c0 -35 36 -126 70 -175 75 -109 194 -190 326 -221 180
 -42 392 25 515 164 43 50 104 168 113 220 l6 32 -515 0 c-510 0 -515 0 -515
 -20z"/>
 </g>
 </svg>`;

  const Bell = () => <SvgXml xml={globeA} width="25" height="25" />;

  return <Bell />;
}
