import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function ActiveComment() {
  const plus_sign = `<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="plus" class="svg-inline--fa fa-plus fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#323339" d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"></path></svg>`;

  const PlusSign = () => <SvgXml xml={plus_sign} width="28" height="31" />;

  return <PlusSign />;
}
