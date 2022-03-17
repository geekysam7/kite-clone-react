import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { faTrash, faEdit } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Line } from "components";
import { deleteWatchlist } from "action/watchlist.action";
import { CreateWatchlistButton } from "components/Instrument/CreateWatchlist";
import { setModalState, setModalType } from "action/uistate.action";
import { appConstants } from "utils/constants";

export default function GearModal() {
  const { watchlistByIds, watchlist } = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();

  let myWatchlists = watchlistByIds.map((id) => watchlist[id]);

  console.log(myWatchlists);

  return (
    <div className="gear-modal">
      {/* <div className="sort-container">
        <div className="sort-container--item">Sort A-Z</div>
        <div className="sort-container--item">Sort By %</div>
      </div> */}
      {/* <Line /> */}
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
                  dispatch(setModalType(appConstants.EDIT_WATCHLIST.label));
                  dispatch(setModalState({ id }));
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div
                className="watchlist-icon"
                onClick={() => {
                  dispatch(deleteWatchlist(id));
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <CreateWatchlistButton />
    </div>
  );
}
