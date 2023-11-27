const showSidebar = (function () {
  // dom caching
  const sidebar = document.querySelector('.sidebar');
  const activateButton = document.querySelector('.sidebar-activate>button');
  const deactivateButton = document.querySelector('.sidebar-header>button');

  // methods
  function show() {
    sidebar.classList.toggle('active');
  }

  function hide() {
    sidebar.classList.toggle('active');
  }

  // event binding
  activateButton.addEventListener('click', show);
  deactivateButton.addEventListener('click', hide);
})();

export default showSidebar;
