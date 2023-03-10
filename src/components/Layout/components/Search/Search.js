import { useState, useEffect, useRef, useCallback } from "react";
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "../../../Popper";
import * as searchServices from "../../../../services/searchService";
import AccountItem from "../../../AccountItem";
import ListMenu from "../../../Popper/Menu/ListMenu";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "../../../../hooks";
const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(searchValue, 500);
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);
      const result = await searchServices.search(debouncedValue);
      setSearchResult(result);

      setLoading(false);
    };
    fetchApi();
  }, [debouncedValue]);
  const inputRef = useRef();
  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };
  const handleHideResult = () => {
    setShowResult(false);
  };
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };
  const handleRenderListItem = useCallback((searchResult) => {
    return searchResult;
  },[])
  // const handleRenderListItem =(searchResult) => {
  //   return searchResult;
  // }
  return ( 
    // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context. 
     <div> 
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx("search-title")}>Accounts</h4>
              <ListMenu handleSearch={handleRenderListItem(searchResult)}/>
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            placeholder="Search accounts and videos"
            spellCheck={false}
            onChange={handleChange}
            value={searchValue}
            onFocus={() => setShowResult(true)}
          />
          {!loading && !!searchValue && (
            <button className={cx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}
          <button className={cx("search-btn")} onMouseDown={e => e.preventDefault()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
