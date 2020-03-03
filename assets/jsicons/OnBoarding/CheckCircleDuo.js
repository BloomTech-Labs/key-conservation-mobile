import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function CheckCircleDuo(props) {
  const checkCircleDuo = `
  <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="fa-group"><path class="fa-secondary"  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm155.31 195.31l-184 184a16 16 0 0 1-22.62 0l-104-104a16 16 0 0 1 0-22.62l22.62-22.63a16 16 0 0 1 22.63 0L216 308.12l150.06-150.06a16 16 0 0 1 22.63 0l22.62 22.63a16 16 0 0 1 0 22.62z" opacity="0.4"></path><path class="fa-primary" fill='#fff' d="M227.31 387.31a16 16 0 0 1-22.62 0l-104-104a16 16 0 0 1 0-22.62l22.62-22.63a16 16 0 0 1 22.63 0L216 308.12l150.06-150.06a16 16 0 0 1 22.63 0l22.62 22.63a16 16 0 0 1 0 22.62l-184 184z"></path></g></svg>`;
  const CheckCircleDuo = () => (
    <SvgXml
      xml={checkCircleDuo}
      width='16'
      height='16'
      fill='#fff'
      {...props}
    />
  );

  return <CheckCircleDuo />;
}
