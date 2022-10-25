import './App.css';
import {
  BrowserRouter as Router, Routes,
  Route, Redirect
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux'
import Inicio from './pages/Inicio';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Inicio />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
