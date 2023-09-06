import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Rates from './pages/Rates';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rates />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;