import { Routes,Route } from "react-router-dom";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";

import UserListPage from "./pages/UserListPage";

import UserPage from "./pages/UserPage";
import InteractionsProvider from "./components/InteractionsProvider";

function App() {
  return (
    <>
      <InteractionsProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/userlist" element={<UserListPage/>} />
          <Route path="/user/:id" element={<UserPage/>}/>
        </Routes>
      </InteractionsProvider>
    </>
  );
}

export default App;
