import { Route, Routes } from 'react-router-dom';


import Journal from './pages/Journal';
import CreateJournal from './pages/CreateJournal';

import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import JournalCard from './pages/JournalCard';
import EditJournal from './pages/EditJournal';
import Home from './pages/home';

function App() {
  return (
    <main className='px-24 py-8'>
      <Navbar />
      <Routes>
        <Route path='/' element= {<PrivateRoute><Home /></PrivateRoute>}/>
        <Route path='/login' element= {<Login />} />
        <Route path='/my-journals' element= {<PrivateRoute><Journal /></PrivateRoute>} />
        <Route path='/create-journal' element= {<PrivateRoute><CreateJournal /></PrivateRoute>} />
        <Route path='/open-journal/:id' element= {<JournalCard />} />
        <Route path='/edit-journal/:id' element= {<EditJournal />} />
        <Route path='/create-account' element={<CreateAccount />} />
      </Routes>
    </main>
  );
}

export default App;
 