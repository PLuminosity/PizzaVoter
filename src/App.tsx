import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './Navbar.tsx';
import { AddPizza} from './pages/AddPizza.tsx';
import { VotePizza } from './pages/VotePizza.tsx';
import { ResultSummary } from './pages/ResultSummary.tsx';

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
      case '/pages/AddPizza':
        document.title = 'Přidat Pizzu - Pizza Voter';
        break;
      case '/pages/VotePizza':
        document.title = 'Hlasování - Pizza Voter';
        break;
      case '/pages/ResultSummary':
        document.title = 'Výsledky - Pizza Voter';
        break;
      default:
        document.title = 'Pizza Voter';
    }
  }, [location.pathname]);

  return null;
}


function App() {
  return (
    <BrowserRouter>
        <TitleUpdater />
        <Navbar />
        <Routes>
            <Route path="/" element={<AddPizza />} />
            <Route path="/pages/AddPizza" element={<AddPizza />}  />
            <Route path="/pages/VotePizza" element={<VotePizza />} />
            <Route path="/pages/ResultSummary" element={<ResultSummary />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
