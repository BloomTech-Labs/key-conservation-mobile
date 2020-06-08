import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function BookmarkSolid(props) {
  const bookmark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"/></svg>`;

  const BookmarkSolid = () => (
    <SvgXml xml={bookmark} width="22" height="22" fill="#323339" {...props} />
  );

  return <BookmarkSolid />;
}
