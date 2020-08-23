import React, { useState } from 'react';
import './App.css';
import Grid from './Grid';

function App() {
	const [ cells, setCells ] = useState([]);
	return (
		<div className="App">
			<Grid dim={8} cells={cells} setCells={setCells} />
			<button onClick={() => setCells([])}>Reset</button>
		</div>
	);
}

export default App;
