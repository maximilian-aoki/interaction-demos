const showSidebar = (function () {
  // dom caching
  const sidebar = document.querySelector('.sidebar');
  const trigger = document.querySelector('html');

  // methods
  function show() {
    sidebar.classList.toggle('active');
  }

  // event binding
  trigger.addEventListener('click', show);
})();

export default showSidebar;
