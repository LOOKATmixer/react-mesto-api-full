import React from 'react';

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image ${
        props.card && props.isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className='popup__container popup__container_image'>
        <button
          type='button'
          className='popup__close-button'
          aria-label='Закрыть'
          onClick={props.onClose}
        />
        <img className='popup__image' src={props.card ? props.card.link : ''} alt='#' />
        <h2 className='popup__title popup__title_image'>
          {props.card ? props.card.name : ''}
        </h2>
      </div>
    </div>
  );
}

export default ImagePopup;
