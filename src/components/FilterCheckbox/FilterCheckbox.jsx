import React from 'react';
import './FilterCheckbox.css';

// function FilterCheckbox(props) {
  
//   return (
//     <div className="filterCheckbox">
//       <label className="filterCheckbox__switch">
//         <input className='filterCheckbox__checkbox' onChange={props.handleShortMovies} checked={props.isShortMovies} type="checkbox"></input>
//         <span className="filterCheckbox__slider"></span>
//       </label>
//       <label className="filterCheckbox__switch-description">
//         Короткометражки
//       </label>
//     </div>
//   );
// }

function FilterCheckbox(props) {
  return <label className="filtercheckbox">
    <input className="filtercheckbox__input" type="checkbox" onChange={props.handleShortMovies} checked={props.isShortMovies} />
    <span className="filtercheckbox__visible-input"/>
    Короткометражки
  </label>
}


export default FilterCheckbox;