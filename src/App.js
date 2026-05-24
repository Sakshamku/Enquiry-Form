import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnquiryPage from './pages/EnquiryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<EnquiryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
