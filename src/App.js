import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import Home from './pages/home';
import Layout from "./components/layout"
import Login from './pages/login';
import About from './pages/about'
import PrivateRoute from './routes/PrivateRoutes';
import UserSettings from './pages/usersettings';
import Contact from './pages/contact';


function App() {
  return (
        <Routes>
          <Route element={<Layout />}>
            <Route path ="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="contact" element={<Contact />} />

            <Route path="user" element={<PrivateRoute />} >
              <Route index element={<UserSettings />} />
              <Route path="about" element={<About />} />
            </Route>
          </Route>
        </Routes>
  )
}

export default App