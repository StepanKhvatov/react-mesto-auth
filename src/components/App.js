import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../auth';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [infoTooltipSettings, setInfoTooltipSettings] = React.useState({ isOpen: false, icon: '', text: '' });

  const history = useHistory();
  const helmetContext = {};

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
          }
          history.push('/');
        })
        .catch((err) => console.log(err));
    }
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setLoggedIn(false);
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => { console.log(err); });

    api.getInitialCards()
      .then((res) => {
        setCards(
          res.map((item) => ({
            _id: item._id,
            link: item.link,
            name: item.name,
            owner: item.owner,
            likes: item.likes,
          })),
        );
      })
      .catch((err) => { console.log(err); });

    handleTokenCheck();
  }, [loggedIn]);

  function handleEditAvatarClick() { setEditAvatarPopupOpen(true); }
  function handleEditProfileClick() { setEditProfilePopupOpen(true); }
  function handleAddPlaceClick() { setAddPlacePopupOpen(true); }
  function handleCardClick(card) { setSelectedCard(card); }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipSettings({ isOpen: false, icon: null, text: '' });
  }

  function handleUpdateUser(info) {
    api.setUserInfo(info.name, info.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => { console.log(err); });
  }

  function handleUpdateAvatar(info) {
    api.changeAvatar(info.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => { console.log(err); });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api.putLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => { console.log(err); });
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => { console.log(err); });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((i) => {
          if (i._id !== card._id) {
            return card;
          }
        });
        setCards(newCards);
      })
      .catch((err) => { console.log(err); });
  }

  function handleAddPlaceSubmit(newCard) {
    api.postCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => { console.log(err); });
  }

  return (
    <HelmetProvider context={helmetContext}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header onSignOut={handleLogout} email={email} />
          <Switch>
            <Route path="/sign-up">
              <Register
                setInfoTooltip={setInfoTooltipSettings}
                handleLogin={handleLogin}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                setLoggedIn={setLoggedIn}
                handleLogin={handleLogin}
                setInfoTooltip={setInfoTooltipSettings}
              />
            </Route>
            <ProtectedRoute
              path="/"
              component={Main}
              loggedIn={loggedIn}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
            />
          </Switch>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip onClose={closeAllPopups} settings={infoTooltipSettings} />
        </div>
      </CurrentUserContext.Provider>
    </HelmetProvider>
  );
}

export default App;
