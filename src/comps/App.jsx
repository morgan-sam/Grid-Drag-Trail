import React, { useState } from 'react';
import 'css/App.css';
import Grid from 'comps/Grid.jsx';

function App() {
	const [ dim, setDim ] = useState(6);
	const [ drag, setDrag ] = useState(new Array(3).fill(null));
	const [ cells, setCells ] = useState([]);
	
	return (
		<div className='app'>
			<div className="grid-and-btn">
				<Grid {...{dim, drag, setDrag, cells, setCells}} />
				<button className='btn' onClick={() => setCells([])}>Reset</button>
			</div>
		</div>
	);
}

export default App;
