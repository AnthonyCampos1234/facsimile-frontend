import { Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import DataSources from './pages/DataSources/DataSources';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/sources'} element={<DataSources />} />
        <Route path={'/settings'} element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
