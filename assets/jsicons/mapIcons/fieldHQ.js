import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function FieldHQ() {
  const fieldHQ = `
  <svg version="1.1" id="_x31_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  width="1200px" height="1200px" viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200" xml:space="preserve">
<g>
 <polygon fill="#303030" points="640.265,397.619 640.265,292.006 705.255,292.006 705.255,359.821 993.469,359.821 
     993.469,104.102 830.995,104.102 830.995,36.286 640.265,36.286 542.781,36.286 542.781,292.006 542.781,427.311 61.011,769.538 
     196.641,769.538 196.641,1163.714 466.489,1163.714 466.489,873.38 712.319,873.38 712.319,1163.714 982.167,1163.714 
     982.167,769.538 1138.989,769.538 	"/>
</g>
</svg>`;
  const FieldHQ = () => <SvgXml xml={fieldHQ} width='26' height='26' />;

  return <FieldHQ />;
}
