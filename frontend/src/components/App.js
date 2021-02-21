import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import { Main } from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import PopupWithDelete from './PopupWithDelete';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import * as auth from '../utils/auth';
import failLogo from '../images/failure.png';
import successLogo from '../images/success.png';

function App() {
  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddCard] = React.useState(false);
  const [isPopupImageOpen, setPopupImage] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deletedCard, setDeletedCard] = React.useState(null);
  const [isPopupWithDeleteOpen, setPopupWithDelete] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [dataInfoTool, setDataInfoTool] = React.useState({
    title: '',
    icon: '',
  });
  const [userData, setUserData] = React.useState('');
  const history = useHistory();

  function handleEditProfileClick() {
    setEditProfile(true);
  }

  function handleEditAvatarClick() {
    setAvatarPopup(true);
  }

  function handleAddPlaceClick() {
    setAddCard(true);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setPopupImage(true);
  }

  function closeAllPopups() {
    setEditProfile(false);
    setAvatarPopup(false);
    setAddCard(false);
    setPopupImage(true);
    setPopupWithDelete(false);
    setSelectedCard(null);
    setDeletedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleDeleteClick(card) {
    setPopupWithDelete(true);
    setDeletedCard(card);
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deletedCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(items) {
    setIsLoading(true);
    api
      .changeUserInfo(items)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(item) {
    setIsLoading(true);
    api
      .changeAvatar(item)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api
      .addNewCards(newCard)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handlerEscClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function closeByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((data) => {
        history.push('/sign-in');
        setDataInfoTool({
          title: 'Вы успешно зарегистрировались!',
          icon: successLogo,
        });
        handleInfoTooltipOpen();
      })
      .catch((err) => {
        console.error(err);
        setDataInfoTool({
          title: 'Что-то пошло не так! Попробуйте ещё раз.',
          icon: failLogo,
        });
        handleInfoTooltipOpen();
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setUserData(email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        setDataInfoTool({
          title: 'Что-то пошло не так! Попробуйте ещё раз.',
          icon: failLogo,
        });
        console.error(err);
        handleInfoTooltipOpen();
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            console.log(res);
            setUserData(res.email);
            history.push('/');
          } else {
            setDataInfoTool({
              title: 'Что-то пошло не так! Попробуйте ещё раз.',
              icon: failLogo,
            });
            handleInfoTooltipOpen();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function signOut() {
    setLoggedIn(false);
    setUserData('');
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', handlerEscClose);
    document.addEventListener('click', closeByOverlay);
    return () => {
      document.removeEventListener('keydown', handlerEscClose);
      document.removeEventListener('click', closeByOverlay);
    };
  });

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([cards, userData]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header headerMail={userData} signOut={signOut} />
        <Switch>
          <ProtectedRoute
            exact
            path='/'
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteClick}
            loggedIn={loggedIn}
          />
          <Route path='/sign-up'>
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path='/sign-in'>
            <Login handleLogin={handleLogin} />
          </Route>
          <Route exact path='/'>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isPopupImageOpen}
          onClose={closeAllPopups}
        />
        <PopupWithDelete
          isOpen={isPopupWithDeleteOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
          card={deletedCard}
          isLoading={isLoading}
        />
        <InfoToolTip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={dataInfoTool.title}
          icon={dataInfoTool.icon}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
