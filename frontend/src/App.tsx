import { BrowserRouter, Route, Routes } from "react-router-dom";

import NewAccountCreate from "./pages/NewAccountCreate";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/newaccountcreate" element={<NewAccountCreate />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
