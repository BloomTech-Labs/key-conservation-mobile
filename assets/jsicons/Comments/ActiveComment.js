import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function ActiveComment() {
  const active_comment = `<svg
  width='20'
  height='20'
  viewBox='0 0 20 20'
  fill='none'
  xmlns='http://www.w3.org/2000/svg'
>
  <path
    d='M0 10C0 4.47581 4.47581 0 10 0C15.5242 0 20 4.47581 20 10C20 15.5242 15.5242 20 10 20C4.47581 20 0 15.5242 0 10ZM11.7742 14.6774V10H14.6331C15.0645 10 15.2823 9.47581 14.9758 9.17339L10.3427 4.56452C10.1532 4.375 9.85081 4.375 9.66129 4.56452L5.02419 9.17339C4.71774 9.47984 4.93548 10 5.36694 10H8.22581V14.6774C8.22581 14.9435 8.44355 15.1613 8.70968 15.1613H11.2903C11.5565 15.1613 11.7742 14.9435 11.7742 14.6774Z'
    fill='#7B7D88'
  />
</svg>`;

  const ActiveComment = () => (
    <SvgXml xml={active_comment} width="23" height="23" />
  );

  return <ActiveComment />;
}
