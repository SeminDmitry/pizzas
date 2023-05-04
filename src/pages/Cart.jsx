import React from 'react';
import FilledCart from '../components/FilledCart';
import EmptyCart from '../components/EmptyCart';
import { useSelector } from 'react-redux';

const Cart = () => {
  const { totalPrice } = useSelector((state) => state.cartSlice);

  if (!totalPrice) {
    return <EmptyCart />;
  } else {
    return <FilledCart />;
  }
};

export default Cart;
