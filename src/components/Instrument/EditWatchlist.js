import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Modal } from "components";
import { editWatchlist } from "action/watchlist.action";
import { setModalType } from "action/uistate.action";

export default function EditWatchlist({ show }) {
  const modalState = useSelector((state) => state.uistate.modalState);
  const currentWatchlistName = useSelector(
    (state) => state.watchlist.watchlist[modalState.id]?.name
  );

  const closeModal = () => {
    dispatch(setModalType(""));
  };

  const dispatch = useDispatch();

  const [watchlistName, setWatchlistName] = useState(
    currentWatchlistName || ""
  );
  const [error, setError] = useState("");
  const handleWatchlistNameChange = (e) => {
    let name = e.target.value;

    if (name.length >= 15) {
      setError("Max length should only be 15");
    } else {
      setError("");
    }

    setWatchlistName(name);
  };

  const handleSubmit = () => {
    if (!watchlistName) return setError("No name specified!");
    if (error) return;

    dispatch(editWatchlist({ name: watchlistName, id: modalState.id }));
    closeModal();
  };

  return (
    <Modal
      show={show}
      close={closeModal}
      submitButton={"Save"}
      handleSubmit={handleSubmit}
      closeButton={"Close"}
      title="Edit Watchlist"
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
