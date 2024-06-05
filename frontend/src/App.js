import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/global/home';
import Layout from "./components/layout"
import About from './pages/private/about'
import PrivateRoute from './routes/PrivateRoutes';
import UserSettings from './pages/private/usersettings';
import Contact from './pages/global/contact';
import Products from './pages/global/products'
import Checkout from './pages/global/checkout';


function App() {
  return (
        <Routes>
          <Route element={<Layout />}>
            <Route path ="/" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="products" element={<Products />} />
            <Route path="checkout" element={<Checkout />} />
    
            <Route path="user" element={<PrivateRoute />} >
              <Route index element={<UserSettings />} />
              <Route path="about" element={<About />} />
            </Route>
          </Route>
        </Routes>
  )
}

export default App