document.addEventListener('DOMContentLoaded', function() {

  myBookmarkManager.initialize();

  document.getElementById('add').addEventListener('click', function() {
    myBookmarkManager.createBookmark();
  });

  if (document.addEventListener) {
    document.addEventListener('click', myBookmarkManager.interactWithBookmark);
  } else {
    document.attachEvent('onclick', myBookmarkManager.interactWithBookmark);
  }
});
