
import Sidebar from './components/Sidebar/Sidebar';

import OrdersPage from './pages/OrdersPage/OrdersPage';
import AuthPage from './pages/AuthPage/AuthPage';
import PanelPage from './pages/PanelPage/PanelPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import SupportPage from './pages/SupportPage/SupportPage';
import { ToastContainer } from 'react-toastify'

import { Routes, Route } from 'react-router-dom'

import '../src/assets/scss/index.scss'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


function App() {
  return (
    <div className="App">
      <div className="App__inner">
        <Sidebar />

        <Routes>
          <Route path='/' element={<PanelPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/orders' element={<OrdersPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/support' element={<SupportPage />} />
        </Routes>
        
        {/* <AuthPage /> */}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
