import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setModalType } from "../../redux/uistate/uistate.action";
import {
  createWatchlist,
  handleItemInTransaction,
} from "../../redux/watchlist/watchlist.action";
import { appConstants } from "../../utils/constants";
import Modal from "../Modal/Modal";

export function CreateWatchlistButton() {
  const dispatch = useDispatch();

  return (
    <div className="instruments-watchlist">
      <button
        className="instrument-button"
        onClick={() => dispatch(setModalType(appConstants.WATCHLIST.label))}
      >
        Create Watchlist
      </button>
    </div>
  );
}

function CreateWatchlist({ show }) {
  const closeModal = () => {
    dispatch(setModalType(""));
  };

  const dispatch = useDispatch();

  const [watchlistName, setWatchlistName] = useState("");
  const [error, setError] = useState("");
  const handleWatchlistNameChange = (e) => {
    let name = e.target.value;

    if (name.length >= 15) {
      setError("Max length should only be 15");
    }

    setWatchlistName(name);
  };

  const handleSubmit = () => {
    if (!watchlistName) return setError("No name specified!");

    dispatch(createWatchlist({ name: watchlistName, items: [] }));
    dispatch(handleItemInTransaction({ created: true }));
    closeModal();
  };

  return (
    <Modal
      show={show}
      close={closeModal}
      submitButton={"Create"}
      handleSubmit={handleSubmit}
      closeButton={"Close"}
      title="Create Watchlist"
    >
      <div className="funds-wrapper">
        <input
          type="text"
          placeholder="Ex: Best Stocks"
          className="funds-input"
          value={watchlistName}
          onChange={handleWatchlistNameChange}
          autoFocus={true}
        />
      </div>
      {error && <div className="error-wrapper">{error}</div>}
    </Modal>
  );
}

export default CreateWatchlist;
