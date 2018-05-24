(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        if (item.reviewImgUrl.toString() == '') {
          appendString += '<a href="' + item.url + '"><div class="row hover-shadow"><div class="col-12"><h3>' + item.title + '</h3><p style="color:black;">' + item.content.substring(0, 250) + '...</p></div></div></a>';
        }
        else {
          appendString += '<a href="' + item.url + '"><div class="row hover-shadow"><div class="col-md-3 col-sm-12"><img style="width: 100%;" src="' + item.reviewImgUrl + '"></div><div class="col-md-9 col-sm-12"><h3>' + item.title + '</h3><p style="color:black;">' + item.content.substring(0,250) + '...</p></div></div></a>';
        }
      }
      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<div style="background: #f2f2f2; margin-bottom: 1rem; padding: 1rem;"><div class="user row"><h1 class="testimonials-caption col-12"><div class="user_name custom-bold custom-fonts-style align-left pt-3 display-7">Oops.</div></h1><p class="user_desk custom-light custom-fonts-style align-left pt-2 display-7" style="margin-left: 1rem;">Sorry, we couldn&apos;t find anything matching that description.</p></div></div></div></div>';
    }
  }

  function getQVariable(variable) {
    var q = window.location.search.substring(1);
    var vars = q.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQVariable('q');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('content');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'author': window.store[key].author,
        'category': window.store[key].category,
        'content': window.store[key].content
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section
    }
  }
})();
