import React, { useState } from 'react';
import 'css/App.css';
import Grid from 'comps/Grid.jsx';

function App() {
	const [ cells, setCells ] = useState([]);
	return (
		<div className="app">
			<Grid dim={8} cells={cells} setCells={setCells} />
			<button className='btn' onClick={() => setCells([])}>Reset</button>
		</div>
	);
}

export default App;
