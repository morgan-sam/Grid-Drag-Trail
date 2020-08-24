import React, { useState } from 'react';
import 'css/App.css';
import Grid from 'comps/Grid.jsx';

function App() {
	const [ cells, setCells ] = useState([]);
	return (
		<div className='app'>
			<div className="grid-and-btn">
				<Grid dim={6} cells={cells} setCells={setCells} />
				<button className='btn' onClick={() => setCells([])}>Reset</button>
			</div>
			<li className='move-list'>
				{[ ...Array(20) ].map((x, i) => <li>{i}</li>)}
			</li>
		</div>
	);
}

export default App;
