import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Journal from './pages/Journal';
import CreateJournal from './pages/CreateJournal';

import Navbar from './components/Navbar';

function App() {
  return (
    <main className='px-24 py-8'>
      <Navbar />
      <Routes>
        <Route path='/' element= {<Home />}/>
        <Route path='/my-journals' element= { <Journal />} />
        <Route path='/create-journal' element= { <CreateJournal />} />
      </Routes>
    </main>
  );
}

export default App;
 