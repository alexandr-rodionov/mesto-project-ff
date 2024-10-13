export const showPreloader = (parent, preloader) => {
  preloader.classList.add('preloader');
  parent.append(preloader);
};

export const removePreloader = (preloader) => {
  if (preloader) preloader.remove();
};

export const changeSubmitButtonText = (popup, text) => {
  popup.querySelector(".popup__button").textContent = text;
};

export const preloadBlur = (list) => {
  list.forEach(item => {
    if (item.classList.contains('filter-blur')) {
      item.classList.remove('filter-blur');
    } else {
      item.classList.add('filter-blur');
    }
  });
};