import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWatchlist,
  handleItemInTransaction,
  toggleWatchlistModalState,
} from "../../redux/watchlist/watchlist.action";
import Modal from "../Modal/Modal";

function CreateWatchlist() {
  const isWatchlistModalOpen = useSelector(
    (state) => state.watchlist.isWatchlistModalOpen
  );

  const closeModal = () => {
    dispatch(toggleWatchlistModalState());
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
      show={isWatchlistModalOpen}
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
