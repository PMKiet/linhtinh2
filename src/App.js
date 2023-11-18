import NavBar from "./pages/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import DetaileBlog from "./pages/HomePage/DetaileBlog";
import CountdownTimer from "./pages/countDown/CountdownTimer";
import TableUser from "./pages/TableUser/TableUser";
import FormAddUser from "./pages/TableUser/formAddUser";
import FormEditUser from "./pages/TableUser/formEditUser";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/home/:id" element={<DetaileBlog />} />
          <Route path="/countTime" element={<CountdownTimer />} />
          <Route path="/tableUser" element={<TableUser />} />
          <Route path="/createUser" element={<FormAddUser />} />
          <Route path="/update/:id" element={<FormEditUser />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
