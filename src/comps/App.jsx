import React, { useState } from 'react';
import 'css/App.css';
import Grid from 'comps/Grid.jsx';

function App() {
	const [ symbol, setSymbol ] = useState('arrow');
	const [ dim, setDim ] = useState(6);
	const [ drag, setDrag ] = useState(new Array(3).fill(null));
	const [ cells, setCells ] = useState([]);
	
	return (
		<div className='app'>
			<div className="grid-and-btn">
				<Grid {...{symbol, dim, drag, setDrag, cells, setCells}} />
				<div className='btn-container'>
					<button className='btn' onClick={() => setCells([])}>Reset</button>
					<button className='btn' onClick={() => setSymbol((cur)=>{
						if (cur === 'arrow') return 'rail'
						else return 'arrow'
					})}>Symbol</button>
				</div>
			</div>
		</div>
	);
}

export default App;
