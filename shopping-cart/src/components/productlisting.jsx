import { useEffect } from 'react'
import { useCartContext } from '../../context/cart-context'


const ProductListing = () => {

  const API_URL = "https://fakestoreapi.com/products/"

  const { state, dispatch } = useCartContext()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        dispatch({ type: "SET_PRODUCTS", payload: data });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [])

  const isProductExistsInCart = (id) => {
    return state.cart.some((item) => item.id === id);
  }

  return (
    <div className='flex flex-wrap  w-full'>
      {state.products.map((product) => (
        <div key={product.id} className='border p-2  max-sm:w-1/2 md:w-1/3 w-[31%] h-fit pb-6 rounded shadow-lg'>
          <img src={product.image} alt={product.title} className='w-full h-52' />
          <h3 className='text-2xl font-mono truncate my-5 ml-2'>{product.title}</h3>
          <div className='flex justify-between items-center max-sm:flex-col lg:flex-row md:flex-col'>
            <p className='font-mono text-xl font-bold'>Price: <span className='text-blue-600'>${product.price}</span></p>
            {
              isProductExistsInCart(product.id) ?  <button className='bg-red-500 text-white px-4 py-2 rounded mr-3' onClick={() => dispatch({
              type: "REMOVE_FROM_CART", payload: {
                id: product.id,
              }
            })}>
              Remove Item
            </button> :
            <button className='bg-blue-500 text-white px-4 py-2 rounded mr-3' onClick={() => dispatch({
              type: "ADD_TO_CART", payload: {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
              }
            })}>
              Add to Cart
            </button>
        }
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductListing
