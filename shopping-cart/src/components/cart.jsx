import React from 'react'
import { useCartContext } from '../../context/cart-context'

const Cart = () => {
  const { state, dispatch } = useCartContext();

  const totalPrice = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Cart</h1>

      {state.cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        state.cart.map((item) => {
          if (item.quantity <= 0) return <p className="text-center text-gray-500">Your cart is empty.</p>;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 border p-4 rounded-xl shadow-sm hover:shadow-md transition mb-5"
            >
              <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />

              <div className="flex-1">
                <h3 className="font-medium text-lg line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 mt-1">Price: <span className="font-semibold">${item.price}</span></p>
                <p className="text-gray-600">Quantity: <span className="font-semibold">{item.quantity}</span></p>

                <div className="flex gap-3 mt-3">
                  <button
                    className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_CART_ITEM',
                        payload: { id: item.id, type: 'ADD' },
                      })
                    }
                  >
                    +
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_CART_ITEM',
                        payload: { id: item.id, type: 'REMOVE' },
                      })
                    }
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          )
        }
        )
      )}

      {state.cart.length > 0 && totalPrice > 0 && <p className='font-bold'>Total Cart Price :: <span className='text-green-600 text-xl'>${totalPrice}</span></p>}
    </div>
  );
};

export default Cart;
