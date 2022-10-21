import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, 
  Route, Redirect,} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux'
import Inicio from './pages/Inicio';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />}/>        
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
