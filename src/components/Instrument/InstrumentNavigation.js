import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedWatchlist } from "../../redux/watchlist/watchlist.action";

function InstrumentNavigation() {
  const watchlist = useSelector((state) => state.watchlist.watchlist);
  const selectedWatchlist = useSelector((state) => state.watchlist.selected);

  const dispatch = useDispatch();

  const handleWatchlistIdClick = (id) => {
    if (selectedWatchlist === id) return;

    dispatch(setSelectedWatchlist(id));
  };

  return (
    <ul className="instruments-lists">
      {watchlist.map((item, id) => (
        <li
          key={item.name}
          data-balloon-pos="up"
          data-balloon={item.name}
          className={
            "instruments-lists--item" +
            (selectedWatchlist === id ? " instruments-lists--selecteditem" : "")
          }
          onClick={() => handleWatchlistIdClick(id)}
        >
          <span className="tooltip">{item.name}</span>
          {id + 1}
        </li>
      ))}
    </ul>
  );
}

export default InstrumentNavigation;
