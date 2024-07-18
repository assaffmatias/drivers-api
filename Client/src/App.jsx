import PATHROUTES from './helpers/PathRoutes';
import { Detail, Form, Home, Landing, Error } from './views';
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

function App() {

  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path={PATHROUTES.HOME} element={<Landing/>}/>
        <Route path={PATHROUTES.DRIVERS} element={<Home/>}/>
        <Route path={PATHROUTES.DETAIL} element={<Detail />}/>
        <Route path={PATHROUTES.CREATE} element={<Form />}/>
        <Route path={PATHROUTES.ERROR} element={<Error />}/>
      </Routes>
    </div>
  )
}

export default App;
