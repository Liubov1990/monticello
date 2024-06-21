export const assignValues = (imgFrom, textFrom, elemTo) => {
  imgFrom.src = elemTo.src;
  imgFrom.alt = elemTo.alt;
  textFrom.innerHTML = elemTo.alt;
};
