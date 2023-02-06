import { memo } from "react";
import AccountItem from "../../../AccountItem";
function ListMenu({ handleSearch }) {
  console.log("re-render");
  const searchValue = handleSearch;
  return searchValue.map((result) => (
    <AccountItem key={result.id} data={result} />
  ));
}

export default memo(ListMenu);
