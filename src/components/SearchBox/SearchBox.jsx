import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filter/slice.js";
import { selectNameFilter } from '../../redux/filter/selectors.js';

const SearchBox = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectNameFilter);

  return (
    <div>
      <p>Find contacts</p>
      <input
        type="text"
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
};

export default SearchBox;
