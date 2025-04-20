import { Route, Routes } from "react-router-dom";
import "./App.css";
import List from "./todos/List";
import Create from "./todos/Create";
import Edit from "./todos/Edit";
import Signup from "./auth/signup";
import Signin from "./auth/signin";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<List />} />
        <Route path="/add" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
