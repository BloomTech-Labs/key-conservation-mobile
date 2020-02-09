import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function Ellipse(props) {
  const ellipse = `
  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="ellipsis-v" class="svg-inline--fa fa-ellipsis-v fa-w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 208c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zM16 104c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48zm0 304c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48z"></path></svg>`;
  const Ellipse = () => (
    <SvgXml xml={ellipse} width='16' height='16' fill="#fff" {...props} />
  );

  return <Ellipse />;
}
