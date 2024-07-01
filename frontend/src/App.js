import { Route, Routes } from 'react-router-dom';
import Home from './pages/global/home';
import Layout from "./components/layout";
import Stocklist from './pages/private/stocklist';
import PrivateRoute from './routes/PrivateRoutes';
import ProductManagement from './pages/private/productmanagement';
import Contact from './pages/global/contact';
import Products from './pages/global/products';
import Checkout from './pages/global/checkout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="products" element={<Products />} />
        

        {/* Define roles for the user routes */}
        <Route path="user" element={<PrivateRoute roles={['Personnel']} />}>
          <Route index element={<ProductManagement />} />
          <Route path="stocklist" element={<Stocklist />} />
        </Route>

        {/* Define a customer route as an example */}
        <Route path="customer" element={<PrivateRoute roles={[]} />}>
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;