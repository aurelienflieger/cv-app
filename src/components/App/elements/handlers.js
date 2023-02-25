const toggleFocusStyle = (event) => {
  event.target.parentNode.classList.remove("incorrectInput");
  event.target.parentNode.classList.remove("correctInput");
  event.target.parentNode.classList.toggle("focusedInput");
};
const toggleErrorStyle = (event) => {
  if (event.target) {
  event.target.parentNode.classList.remove("correctInput");
  event.target.parentNode.classList.add("incorrectInput");
  }
};
const toggleSuccessStyle = (event) => {
  event.target.parentNode.classList.remove("incorrectInput");
  event.target.parentNode.classList.add("correctInput");
};

export { toggleErrorStyle, toggleFocusStyle, toggleSuccessStyle };
