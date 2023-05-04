import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

function Categories() {
  const activeCategoryId = useSelector((state) => state.filterSlice.activeCategoryId);
  const dispatch = useDispatch();

  const onClickCategory = (i) => {
    dispatch(setActiveCategoryId(i));
    dispatch(setCurrentPage(1));
  };

  const categoriesArr = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categoriesArr.map((value, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={activeCategoryId === i ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
