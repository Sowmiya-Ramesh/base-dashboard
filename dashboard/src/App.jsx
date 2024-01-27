import './App.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard'
import LoginPage from './components/LoginPage/LoginPage'

function App() {

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />}/>
          <Route exact path="/dashboard" element={<Dashboard />}/>
        </Routes>
    </Router>
  )
}

export default App
