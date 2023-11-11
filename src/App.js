import NavBar from "./pages/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import DetaileBlog from "./pages/HomePage/DetaileBlog";


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
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
