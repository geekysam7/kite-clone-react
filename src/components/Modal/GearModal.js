import { faEdit, faTrash } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWatchlist } from "../../redux/watchlist/watchlist.action";
import { CreateWatchlistButton } from "../Instrument/CreateWatchlist";
import Line from "../Line/Line";

function GearModal() {
  const { watchlistByIds, watchlist } = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();

  let myWatchlists = watchlistByIds.map((id) => watchlist[id]);

  console.log(myWatchlists);

  return (
    <div className="gear-modal">
      <div className="sort-container">
        <div className="sort-container--item">Sort A-Z</div>
        <div className="sort-container--item">Sort By %</div>
      </div>
      <Line />
      <div className="watchlist-heading">Your Watchlists</div>
      <Line />
      <ul className="watchlist-list">
        {watchlistByIds.map((id) => (
          <li key={id} className="watchlist-list--item">
            <div>{watchlist[id].name}</div>
            <div className="watchlist-list--item-options">
              <div
                className="watchlist-icon"
                onClick={() => {
                  dispatch(deleteWatchlist(id));
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
              <div className="watchlist-icon">
                <FontAwesomeIcon icon={faEdit} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <CreateWatchlistButton />
    </div>
  );
}

export default GearModal;
