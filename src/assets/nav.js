const showDropDown = (() => {
  // dom caching
  const navOptions = document.querySelectorAll('.nav-options>li');

  // methods
  function toggle(e) {
    e.target.lastElementChild.classList.toggle('active');
  }

  // event binding
  [...navOptions].forEach((option) => {
    option.addEventListener('mouseenter', toggle);
    option.addEventListener('mouseleave', toggle);
  });
})();

export default showDropDown;
