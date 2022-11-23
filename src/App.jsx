import './App.css';
import Painel from './Pages/Painel';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Mapeamento from './Pages/Mapeamento';
function App() {
  return (
    <div className=''>

    
      <Router>
        <Routes>
          <Route  path='/'element={<Painel/>} />
          <Route path='/Mapeamento'  element={<Mapeamento/>}  />
        </Routes>
      </Router>
    
      

      

    </div>
  );
}

export default App;
