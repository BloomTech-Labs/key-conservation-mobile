import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function SkilledGroupCheck(props) {
  const xml = `<svg id="ic_verified_user_24px" xmlns="http://www.w3.org/2000/svg" width="23.4" height="28.6" viewBox="0 0 23.4 28.6"><path id="ic_verified_user_24px-2" data-name="ic_verified_user_24px" d="M14.7,1,3,6.2V14c0,7.215,4.992,13.962,11.7,15.6,6.708-1.638,11.7-8.385,11.7-15.6V6.2ZM12.1,21.8,6.9,16.6l1.833-1.833L12.1,18.121l8.567-8.567L22.5,11.4Z" transform="translate(-3 -1)" fill="#505050"/></svg>`;

  const SkilledGroupCheck = () => (
    <SvgXml xml={xml} width="25" height="25" fill="#D7FF43" {...props} />
  );

  return <SkilledGroupCheck />;
}
