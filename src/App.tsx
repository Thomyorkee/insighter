import React from 'react';
import EventListPage from './pages/event-list-page';
import EventFormPage from './pages/event-form-page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className='main-wrap'>
    <Router>
      <Routes>
        <Route path="/" element={<EventListPage />} />
        <Route path="/add" element={<EventFormPage />} />
        <Route path="/edit/:id" element={<EventFormPage />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;