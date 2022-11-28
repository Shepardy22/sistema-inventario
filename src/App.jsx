import './App.css';
import Painel from './Pages/Painel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mapeamento from './Pages/Mapeamento';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ContextNavProvider } from './contexts/contextNav';
function App() {
  return (
    <div >


      <Router>
        <ContextNavProvider>
          <Routes>
            <Route path='/' element={<Painel />} />
            <Route path='/Mapeamento' element={<Mapeamento />} />
          </Routes>
        </ContextNavProvider>
      </Router>





    </div>
  );
}

export default App;
