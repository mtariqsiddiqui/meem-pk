import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { CartItem } from '../types';
import { cartService, AddToCartData } from '../services/cartService';
import { useAuth } from './AuthContext';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

interface CartContextType extends CartState {
  addToCart: (data: AddToCartData) => Promise<void>;
  updateCartItem: (id: string, quantity: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  refreshCart: () => Promise<void>;
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ITEMS':
      return { ...state, items: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isLoading: false,
    error: null
  });

  const { user, isLoading: authLoading } = useAuth();

  const refreshCart = async () => {
    if (!user) {
      dispatch({ type: 'CLEAR_CART' });
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const items = await cartService.getCart();
      dispatch({ type: 'SET_ITEMS', payload: items });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load cart' });
    }
  };

  useEffect(() => {
    if (!authLoading) {
      refreshCart();
    }
  }, [user, authLoading]);

  const addToCart = async (data: AddToCartData) => {
    try {
      const { cartItem } = await cartService.addToCart(data);
      const existingItem = state.items.find(item => 
        item.productId === data.productId && 
        item.size === data.size && 
        item.color === data.color
      );

      if (existingItem) {
        dispatch({ type: 'UPDATE_ITEM', payload: cartItem });
      } else {
        dispatch({ type: 'ADD_ITEM', payload: cartItem });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to add to cart' });
    }
  };

  const updateCartItem = async (id: string, quantity: number) => {
    try {
      const { cartItem } = await cartService.updateCartItem(id, quantity);
      dispatch({ type: 'UPDATE_ITEM', payload: cartItem });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to update cart' });
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      await cartService.removeFromCart(id);
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to remove from cart' });
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to clear cart' });
    }
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};