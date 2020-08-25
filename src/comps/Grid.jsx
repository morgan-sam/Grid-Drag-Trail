import React, { useState, useEffect } from 'react';
import 'css/Grid.css';

const Grid = (props) => {
	const { dim, cells, setCells, drag, setDrag } = props;

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
		const lastDrag = getDirection(drag[1], drag[2]);
		const penultimateDrag = getDirection(drag[0], drag[1]);
		if (penultimateDrag === '⬆' && lastDrag === '➡️') return '⬈';
		else if (penultimateDrag === '⬆' && lastDrag === '⬅') return '⬉';
		else if (penultimateDrag === '➡️' && lastDrag === '⬆') return '⬈';
		else if (penultimateDrag === '➡️' && lastDrag === '⬇') return '⬊';
		else if (penultimateDrag === '⬇' && lastDrag === '➡️') return '⬊';
		else if (penultimateDrag === '⬇' && lastDrag === '⬅') return '⬋';
		else if (penultimateDrag === '⬅' && lastDrag === '⬆') return '⬉';
		else if (penultimateDrag === '⬅' && lastDrag === '⬇') return '⬋';
	};

	// ⬈⬉⬊⬋

	const checkIfFirstDrag = (drag) => drag.filter((el) => el === null).length === 1;

	useEffect(
		() => {
			const last = getDirection(drag[1], drag[2]);
			const penultimate = getPenultimateDragDirection(drag);

			if (checkIfFirstDrag(drag)) {
				addSymbols([ { index: drag[1], symbol: last }, { index: drag[2], symbol: last } ]);
			} else {
				addSymbols([ { index: drag[1], symbol: penultimate }, { index: drag[2], symbol: last } ]);
			}
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
