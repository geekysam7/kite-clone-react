import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedWatchlist,
  toggleWatchlistModalState,
} from "../../redux/watchlist/watchlist.action";
import CreateWatchlist from "./CreateWatchlist";
import { faWrench } from "@fortawesome/fontawesome-free-solid";
import useClickOutside from "../../hooks/useClickOutside";
import GearModal from "../Modal/GearModal";

function InstrumentNavigation() {
  const { watchlistByIds, watchlist, isWatchlistModalOpen } = useSelector(
    (state) => state.watchlist
  );
  const [isGearModalOpen, setIsGearModalOpen] = useState(false);

  const domNode = useClickOutside(() => {
    setIsGearModalOpen(false);
  });

  const selectedWatchlist = useSelector((state) => state.watchlist.selected);

  const dispatch = useDispatch();

  const handleWatchlistIdClick = (id) => {
    if (selectedWatchlist === id) return;

    dispatch(setSelectedWatchlist(id));
  };

  return (
    <ul className="instruments-lists">
      {watchlistByIds.length ? (
        watchlistByIds.map((watchlistId, idx) => (
          <li
            key={watchlistId}
            data-balloon-pos="up"
            data-balloon={watchlist[watchlistId].name}
            className={
              "instruments-lists--item" +
              (selectedWatchlist === watchlistId
                ? " instruments-lists--selecteditem"
                : "")
            }
            onClick={() => handleWatchlistIdClick(watchlistId)}
          >
            <span className="tooltip">{watchlist[watchlistId].name}</span>
            {idx + 1}
          </li>
        ))
      ) : (
        <div className="instruments-watchlist">
          <button
            className="instrument-button"
            onClick={() => dispatch(toggleWatchlistModalState())}
          >
            Create Watchlist
          </button>
        </div>
      )}

      {watchlistByIds.length ? (
        <div className="gear-wrapper" ref={domNode}>
          <span
            className="instruments-lists--gear"
            onClick={() => setIsGearModalOpen(!isGearModalOpen)}
          >
            <FontAwesomeIcon icon={faWrench} />
          </span>
          {isGearModalOpen && <GearModal />}
        </div>
      ) : null}

      {isWatchlistModalOpen && <CreateWatchlist />}
    </ul>
  );
}

export default InstrumentNavigation;
