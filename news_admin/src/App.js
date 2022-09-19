
import './App.css';
import Child from './Child';
import { useEffect } from 'react';
import axios from 'axios';
import { HashRouter } from 'react-router-dom';
import Myroutes from './router/index'
import store from './redux/store';
import { Provider } from 'react-redux';
import './util/http'
//https://i.maoyan.com/
const url = `ajax/comingList?ci=107&limit=10&movieIds=&token=&optimus_uuid=F10E4F2023AB11ED8AC767432FCE8EC3E6056F125F624C23AB85F1664E9C6576&optimus_risk_level=71&optimus_code=10`;
function App() {
  useEffect(() => {
    // window.localStorage.setItem('__lxsdk__lxsdk_cuid',"181310de1dcc8-0c549449dd113-367a6700-13c680-181310de1dcc8")
    // axios.get(url, {
    //   headers: {
    //     'Content-Type': 'application/json, text/plain, */*',
    //   }
    // }).then(res => {
    //   console.log(res)
    // })
  }, [])
  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <Myroutes />
          {/* <Child /> */}
        </HashRouter>
      </Provider>
    </>
  );
}

export default App;
