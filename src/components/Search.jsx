import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../redux/slices/filterSlice';
import { debounce } from 'lodash';

const Search = () => {
  const searchText = useSelector((state) => state.filterSlice.searchText);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = React.useState(searchText);

  const searchInputRef = React.useRef();

  const debouncedDispatchRef = React.useRef(
    debounce((value) => {
      dispatch(setSearchText(value));
    }, 800),
  );

  const updateSearchText = React.useCallback((value) => {
    debouncedDispatchRef.current(value);
  }, []);

  const handleInputChange = (value) => {
    setInputValue(value);
    updateSearchText(value);
  };

  const handleClearClick = () => {
    setInputValue('');
    dispatch(setSearchText(''));
    searchInputRef.current.focus();
  };

  return (
    <div className="search-box">
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Найти пиццу..."
        value={inputValue}
        onChange={(event) => handleInputChange(event.target.value)}
      />
      <div className="icon-container">
        {inputValue && (
          <svg
            onClick={() => handleClearClick()}
            className="clear-icon"
            height="800px"
            viewBox="0 0 24 24"
            width="800px"
            xmlns="http://www.w3.org/2000/svg">
            <g id="Complete">
              <g id="x">
                <g>
                  <line
                    fill="none"
                    stroke="#ccc"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="5"
                    x2="19"
                    y1="4.8"
                    y2="19.2"
                  />
                  <line
                    fill="none"
                    stroke="#ccc"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="19"
                    x2="5"
                    y1="4.8"
                    y2="19.2"
                  />
                </g>
              </g>
            </g>
          </svg>
        )}
        <svg
          className="search-icon"
          height="800px"
          viewBox="0 0 24 24"
          width="800px"
          xmlns="http://www.w3.org/2000/svg">
          <g id="Complete">
            <g id="search">
              <g>
                <circle
                  cx="10.1"
                  cy="10.1"
                  fill="none"
                  r="8"
                  stroke="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <line
                  fill="none"
                  stroke="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="21.9"
                  x2="16.3"
                  y1="21.9"
                  y2="16.3"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Search;
