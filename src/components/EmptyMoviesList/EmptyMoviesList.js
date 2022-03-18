import React from 'react';

import './EmptyMoviesList.css';

function EmptyMoviesList({ isEmpty, text }) {
  if (!isEmpty) {
    return null;
  }
  return <p className="emptyMoviesList">{text}</p>;
}

export default EmptyMoviesList;