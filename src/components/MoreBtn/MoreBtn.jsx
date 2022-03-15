import React from "react";
import './MoreBtn.css';

function MoreBtn({ isEmpty, onMoreMovies, isEnabledBtn }) {
  function handleMoreMoviesBtn() {
    onMoreMovies();
  }

  if (isEmpty) {
    return null;
  }
  return (
    <div className={`moreBtn__block ${isEnabledBtn ? '' : 'moreBtn__block_disabled'}`}>
      <button className="moreBtn__btn" type="button" onClick={handleMoreMoviesBtn}>
        Ещё
      </button>
    </div>
  );
}

export default MoreBtn;