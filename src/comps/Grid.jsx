import React, { useState, useEffect } from 'react';
import 'css/Grid.css';

const Grid = (props) => {
	const { dim, cells, setCells } = props;
	const [ drag, setDrag ] = useState([ null, null, null ]);

	const addSymbols = (array) => {
		let copy = [ ...cells ];
		array.forEach((el) => (copy[el.index] = el.symbol));
		setCells(copy);
	};

	const cell = (index) => (
		<div
			className='cell'
			key={index}
			onMouseDown={() => setDrag([ null, null, index ])}
			onMouseOver={(e) => {
				if (e.buttons === 1) setDrag([ drag[1], drag[2], index ]);
			}}
		>
			{cells[index]}
		</div>
	);

	const getDirection = (one, two) => {
		if (one === two + 1) return '⬅';
		else if (one === two - 1) return '➡';
		else if (one === two + dim) return '⬆';
		else if (one === two - dim) return '⬇';
	};

	const getPenultimateDragDirection = (drag) => {
		if (getDirection(drag[0], drag[1]) === '⬆' && getDirection(drag[1], drag[2]) === '➡️') return '⬈';
		else if (getDirection(drag[0], drag[1]) === '⬆' && getDirection(drag[1], drag[2]) === '⬅') return '⬉';
		else if (getDirection(drag[0], drag[1]) === '➡️' && getDirection(drag[1], drag[2]) === '⬆') return '⬈';
		else if (getDirection(drag[0], drag[1]) === '➡️' && getDirection(drag[1], drag[2]) === '⬇') return '⬊';
		else if (getDirection(drag[0], drag[1]) === '⬇' && getDirection(drag[1], drag[2]) === '➡️') return '⬊';
		else if (getDirection(drag[0], drag[1]) === '⬇' && getDirection(drag[1], drag[2]) === '⬅') return '⬋';
		else if (getDirection(drag[0], drag[1]) === '⬅' && getDirection(drag[1], drag[2]) === '⬆') return '⬉';
		else if (getDirection(drag[0], drag[1]) === '⬅' && getDirection(drag[1], drag[2]) === '⬇') return '⬋';
	};

	// ⬈⬉⬊⬋

	useEffect(
		() => {
			const last = getDirection(drag[1], drag[2]);
			const penultimate = getPenultimateDragDirection(drag);
			addSymbols([ { index: drag[1], symbol: penultimate }, { index: drag[2], symbol: last } ]);
		},
		[ drag ]
	);

	const genGrid = (dim) => {
		document.documentElement.style.setProperty('--dimension', dim);
		return [ ...Array(dim) ].map((x, a) =>
			[ ...Array(dim) ].map((x, b) => {
				const i = b + a * dim;
				return cell(i);
			})
		);
	};

	return (
		<div className="grid">
			{genGrid(dim)}
		</div>
	);
};

export default Grid;
