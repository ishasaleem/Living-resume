import { Routes, Route } from "react-router-dom";

import ResumeView from "./pages/ResumeView";

function App() {
  return (
    <Routes>
     
      <Route path="/" element={<ResumeView />} />
    </Routes>
  );
}

export default App;
