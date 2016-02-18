document.addEventListener('DOMContentLoaded', function() {
  Manager = new BookmarkManager();

  Manager.initialise();

  document.getElementById('add').addEventListener('click', function() {
    Manager.createBookmark();
  });

  if (document.addEventListener)
    document.addEventListener('click', Manager.openBookmark);
  else
    document.attachEvent('onclick', Manager.openBookmark);
});
