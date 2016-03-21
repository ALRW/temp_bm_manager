document.addEventListener('DOMContentLoaded', function() {

  myBookmarkManager.initialize(myBookmarkManager.fnList);

  document.getElementById('add').addEventListener('click', function() {
    myBookmarkManager.createBookmark();
  });

  if (document.addEventListener) {
    document.addEventListener('click', myBookmarkManager.openBookmark);
  } else {
    document.attachEvent('onclick', myBookmarkManager.openBookmark);
  }
});
