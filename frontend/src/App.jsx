// Global components
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

// Pages
import HomePage from './pages/HomePage/HomePage'
import BasketPage from './pages/BasketPage/BasketPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'

// libraries
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

// styles
import '../src/assets/scss/index.scss'
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <div className="App">
      <Header />
      
      <Routes>
        <Route path='/' element={<HomePage />} /> 
        <Route path='/basket' element={<BasketPage />} /> 
        <Route path='/products' element={<ProductsPage />}/>
      </Routes>

      {/* <Footer /> */}
      <ToastContainer />
    </div>
  )
}

export default App
