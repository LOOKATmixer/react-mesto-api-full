import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameCard(event) {
    setName(event.target.value);
  }

  function handleLinkCard(event) {
    setLink(event.target.value);
  }

  function handleSubmitCard(event) {
    event.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmitCard}
      title='Новое место'
      name='card'
    >
      <label className='form__label'>
        <input
          type='text'
          name='namePlace'
          id='title'
          className='form__input form__input_type_place'
          placeholder='Название'
          onChange={handleNameCard}
          minLength='1'
          maxLength='30'
          value={name || ''}
          autoComplete='off'
          required
        />
        <span className='form__error' id='namePlace-error'></span>
      </label>
      <label className='form__label'>
        <input
          type='url'
          name='aboutPlace'
          id='url'
          className='form__input form__input_type_url'
          placeholder='Ссылка на картинку'
          onChange={handleLinkCard}
          value={link || ''}
          autoComplete='off'
          required
        />
        <span className='form__error' id='aboutPlace-error'></span>
      </label>
      <button
        type='submit'
        name='saveButtonCard'
        className={`popup__save-button`}
      >
        {props.isLoading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
