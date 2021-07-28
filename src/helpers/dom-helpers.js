export const scrollIntoViewById = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView();
  }
};
