describe('popup script', function() {

beforeEach(function(){
chrome = {
  bookmarks: {
    create: function(){}
  }
};
spyOn(chrome.bookmarks, 'create');
});

  describe('#initialise', function() {
    it('creates a Short life Bookmark folder', function() {
      initialise();
      expect(chrome.bookmarks.create).toHaveBeenCalled();
    });
  });
});
