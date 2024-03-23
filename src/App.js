import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import Home from './pages/home';
import Layout from "./components/layout"
import Login from './pages/login';
import About from './pages/about'
import PrivateRoute from './routes/PrivateRoutes';
import UserSettings from './pages/usersettings';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route index element={<Home />} />
            <Route path="usersettings" element={<PrivateRoute>{<UserSettings />}</PrivateRoute>} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App