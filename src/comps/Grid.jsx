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
			{dirToSymbol(cells[index])}
		</div>
	);

	const getDirection = (one, two) => {
		if (one === two + 1) return 6;
		else if (one === two - 1) return 2;
		else if (one === two + dim) return 0;
		else if (one === two - dim) return 4;
	};

	const getPenultimateDragDirection = (drag) => {
		const lastDrag = getDirection(drag[1], drag[2]);
		const penultimateDrag = getDirection(drag[0], drag[1]);

		console.log(`lastDrag: ${lastDrag}`)
		console.log(`penultimateDrag: ${penultimateDrag}`)
		
		if (penultimateDrag === lastDrag) return lastDrag;
		else if (penultimateDrag === 0 && lastDrag === 2) return 1;
		else if (penultimateDrag === 0 && lastDrag === 6) return 7;
		else if (penultimateDrag === 2 && lastDrag === 0) return 1;
		else if (penultimateDrag === 2 && lastDrag === 4) return 3;
		else if (penultimateDrag === 4 && lastDrag === 2) return 3;
		else if (penultimateDrag === 4 && lastDrag === 6) return 5;
		else if (penultimateDrag === 6 && lastDrag === 0) return 7;
		else if (penultimateDrag === 6 && lastDrag === 4) return 5;
	};


	const dirToSymbol = (dir) => {
		switch(dir) {
			case 0: return '⬆';
			case 1: return '⬈';
			case 2: return '➡';
			case 3: return '⬊';
			case 4: return '⬇';
			case 5: return '⬋';
			case 6: return '⬅';
			case 7: return '⬉';
			default: return null
		  }
	}

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
