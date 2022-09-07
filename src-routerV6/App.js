import logo from './logo.svg';
import './App.css';
import {HashRouter} from 'react-router-dom'

import Myroutes from './router/index'
import Tabbar from './components/Tabbar';
function App() {
  return (
    <>
    <HashRouter>
      <Myroutes/>
      <Tabbar/>
    </HashRouter>
    </>
  );
}

export default App;
