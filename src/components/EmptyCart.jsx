import React from 'react';
import { Link } from 'react-router-dom';
import imgCart from '../assets/img/empty-cart.png';

const EmptyCart = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>
          Корзина пустая <icon>😕</icon>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={imgCart} alt="Empty cart" />
        <a href="/" className="button button--black">
          <span>
            {' '}
            <Link to={'/'}> Вернуться назад</Link>
          </span>
        </a>
      </div>
    </div>
  );
};

export default EmptyCart;
