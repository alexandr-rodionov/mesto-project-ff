// Scrolbar lock switching

function toggleBodyScroll(lock) {
  const scrollBarSize = window.innerWidth - document.documentElement.clientWidth;

  document.body.style['padding-right'] = lock ? `${scrollBarSize}px` : '';
  document.body.style.overflow = lock ? 'hidden' : '';
}

// Pop-up window opening

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  toggleBodyScroll(true);
  popup.addEventListener('mousedown', closePopupOnBackDropClick);
  document.addEventListener('keydown', closePopupOnPressEsc);
}

// Pop-up window closing

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  toggleBodyScroll(false);
  popup.removeEventListener('mousedown', closePopupOnBackDropClick);
  document.removeEventListener('keydown', closePopupOnPressEsc);
}

// Pop-up window closing on press Esc key

function closePopupOnPressEsc(e) {
  if (e.keyCode == 27 && document.querySelector('.popup_is-opened')) {
    const openedPopup = document.querySelector('.popup_is-opened');

    closePopup(openedPopup);
  }
}

// Pop-up window closing on backdrop click

function closePopupOnBackDropClick({ currentTarget, target }) {
  const popup = currentTarget;
  const isClickedOnBackDrop = target === popup

  if (isClickedOnBackDrop) {
    closePopup(popup);
  }
}
