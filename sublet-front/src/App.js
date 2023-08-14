import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* 기본 페이지 */}
          <Route path="/"/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
