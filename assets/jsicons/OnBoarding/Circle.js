import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function Circle() {
	const circle = `
	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#f66767" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>`;
	const Circle = () => <SvgXml xml={circle} width='24' height='24' />;

	return <Circle />;
}
