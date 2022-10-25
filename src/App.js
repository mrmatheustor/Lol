import './App.css';
import {
  BrowserRouter as Router, Routes,
  Route, Redirect
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux'
import Inicio from './pages/Inicio';
import { createTheme, ThemeProvider, useTheme } from '@mui/material'


const changeTheme = mode => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
        primary: {
          main: '#31313C',
        },
        secondary: {
          main: '#11cb5f',
        },
        custom: {
          light: '#5a5a63',
          main: '#31313C',
          dark: '#22222a',
          contrastText: '#ffffff',
        },
        textfield: {
          main: '#fff',
          contrastText: '#ffffff',
        },
        components: {
          MuiTextField: {
            color: '#cf0000',
          }
        }
      }
      :
      {
        primary: {
          main: '#31313C',
        },
        secondary: {
          main: '#11cb5f',
        },
        custom: {
          light: '#5a5a63',
          main: '#31313C',
          dark: '#22222a',
          contrastText: '#ffffff',
        },
        textfield: {
          main: '#fff',
          contrastText: '#ffffff',
        },
      }
    )
  }
})


function App() {
  const theme = useTheme()

  const themes = createTheme(changeTheme('dark'))

  return (
    <div className='App'>
      <ThemeProvider theme={themes}>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<Inicio />} />
            </Routes>
          </Router>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
