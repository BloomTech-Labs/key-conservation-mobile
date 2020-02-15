import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function CheckMarkSVG() {
	const checkMark = `

    <svg width="36" height="36" viewBox="0 0 26 25" fill="#00FF9D" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.943002 13.1926C-0.322989 14.4088 -0.305649 15.0542 0.943002 16.1445C0.943002 16.1445 8.53916 25 10.5648 25C12.5905 25 25.2507 5.32101 25.2507 5.32101C26.1144 3.94185 26.3766 3.22681 25.2507 2.36916L22.7187 0.40126C22.0636 -0.105267 21.7241 -0.161501 21.1994 0.40126L10.0584 16.1445L9.55199 15.6525L4.99429 11.2247C4.26517 10.592 3.82808 10.5268 2.96865 11.2247L0.943002 13.1926Z" fill="#00FE9D"/>
    </svg>`;

	const CheckMarkSVG = () => <SvgXml xml={checkMark} width='23' height='23' />;

	return <CheckMarkSVG />;
}
