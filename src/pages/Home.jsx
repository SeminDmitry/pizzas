import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import SkeletonPizzaBlock from '../components/SkeletonPizzaBlock';
import Search from '../components/Search';

import { sortArr } from '../components/Sort';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';

const Home = () => {
  const navigate = useNavigate();

  const { activeCategoryId, sortState, searchText, currentPage } = useSelector(
    (state) => state.filterSlice,
  );
  const dispatch = useDispatch();

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const sceletons = [...new Array(6)];

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCategoryId,
        sortProperty: sortState.axiosSortString,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [activeCategoryId, sortState, currentPage, navigate]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortArr.find((obj) => obj.axiosSortString === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (!isSearch.current) {
      setIsLoading(true);
      axios
        .get(
          activeCategoryId === 0
            ? 'https://643ec1716c30feced8325ce7.mockapi.io/Pizzas?sortBy=' +
                sortState.axiosSortString +
                '&search=' +
                searchText
            : 'https://643ec1716c30feced8325ce7.mockapi.io/Pizzas?category=' +
                activeCategoryId +
                '&sortBy=' +
                sortState.axiosSortString +
                '&search=' +
                searchText,
        )
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
    }

    isSearch.current = false;
  }, [activeCategoryId, sortState, searchText]);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  // укорачивание количества запрашиваемых пицц из базы данных до 8 (для 1 страници)
  const itemsPerPage = 8;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <div className="content__title-search">
        <h2 className="content__title">Все пиццы</h2>
        <Search />
      </div>

      <div className="content__items">
        {isLoading
          ? sceletons.map((_, i) => <SkeletonPizzaBlock key={i} />)
          : paginatedItems.map((objPizza) => <PizzaBlock key={objPizza.id} {...objPizza} />)}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={i + 1 === currentPage ? 'pagination__button active' : 'pagination__button'}
            onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Home;
