import Auth from "./components/Auth";
import Note from "./components/Note";


import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Auth/>}/>
            <Route path="/notes" element={<Note/>}/>
        </Routes>
    
    
    
    </BrowserRouter>
  );
}
