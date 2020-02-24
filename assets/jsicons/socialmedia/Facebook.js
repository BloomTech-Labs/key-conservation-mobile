import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function Facebook(props) {
  const facebook = `
    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" class="svg-inline--fa fa-facebook-f fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>`;
  const Facebook = () => (
    <SvgXml xml={facebook} width='25' height='25' fill='#323338' {...props} />
  );

  return <Facebook />;
}
