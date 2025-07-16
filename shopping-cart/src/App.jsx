import { CartProvider } from '../context/cart-context';
import './App.css'
import Cart from './components/cart';
import ProductListing from './components/productlisting';

function App() {

    return <CartProvider>
        <div className='h-screen flex w-full'>
            <div className='w-3/4 h-full overflow-y-auto'>
                <ProductListing />
            </div>
            <div className='w-1/4 h-full bg-gray-100 p-4'>
                <Cart />
            </div>
        </div>
    </CartProvider>


}

export default App
