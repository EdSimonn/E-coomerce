import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Home from './pages/Home';
import ItemDetails from './pages/ItemDetails';
import Navbar from './components/Navbar';
import CartMenu from './pages/CartMenu';
import Footer from './components/Footer';

const ScrollToTop = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Navbar/>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='item/:itemId' element={<ItemDetails/>}/>
        </Routes>
        <CartMenu/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
