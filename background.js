/*
 * Click handler for extension button
 */
function handleBrowserActionClick() {
  // Get all tabs and if succesful handle them
  var gettingAllTabs = browser.tabs.query({});
  gettingAllTabs.then(bookmarkAllTabs);
}

// Copied from bookmark-it webextension example
function isSupportedProtocol(urlString) {
  var supportedProtocols = ["https:", "http:", "ftp:", "file:"];
  var url = document.createElement('a');
  url.href = urlString;
  return supportedProtocols.indexOf(url.protocol) != -1;
}

// Method that will bookmark all open tabs
function bookmarkAllTabs(tabs) {
  for (let tab of tabs) {
    if (isSupportedProtocol(tab.url)) {
      var searching = browser.bookmarks.search({url: tab.url});
      searching.then((bookmarks) => {
        // if none found, add it
        if (bookmarks.length === 0) {
          browser.bookmarks.create({title: tab.title, url: tab.url});
          console.log('bookmark created: "' + tab.title + '" ('+tab.url+')');
        } else {
          console.log('bookmark exists: "' + tab.title + '" ('+tab.url+')');
        }
      });
    }
  }
}

// Register click event handler for browser action
browser.browserAction.onClicked.addListener(handleBrowserActionClick);
