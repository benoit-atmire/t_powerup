/* global TrelloPowerUp */

// we can access Bluebird Promises as follows
var Promise = TrelloPowerUp.Promise;

/*

Trello Data Access

The following methods show all allowed fields, you only need to include those you want.
They all return promises that resolve to an object with the requested fields.

Get information about the current board
t.board('id', 'name', 'url', 'shortLink', 'members')

Get information about the current list (only available when a specific list is in context)
So for example available inside 'attachment-sections' or 'card-badges' but not 'show-settings' or 'board-buttons'
t.list('id', 'name', 'cards')

Get information about all open lists on the current board
t.lists('id', 'name', 'cards')

Get information about the current card (only available when a specific card is in context)
So for example available inside 'attachment-sections' or 'card-badges' but not 'show-settings' or 'board-buttons'
t.card('id', 'name', 'desc', 'due', 'closed', 'cover', 'attachments', 'members', 'labels', 'url', 'shortLink', 'idList')

Get information about all open cards on the current board
t.cards('id', 'name', 'desc', 'due', 'closed', 'cover', 'attachments', 'members', 'labels', 'url', 'shortLink', 'idList')

Get information about the current active Trello member
t.member('id', 'fullName', 'username')

For access to the rest of Trello's data, you'll need to use the RESTful API. This will require you to ask the
user to authorize your Power-Up to access Trello on their behalf. We've included an example of how to
do this in the `🔑 Authorization Capabilities 🗝` section at the bottom.

*/

/*

Storing/Retrieving Your Own Data

Your Power-Up is afforded 4096 chars of space per scope/visibility
The following methods return Promises.

Storing data follows the format: t.set('scope', 'visibility', 'key', 'value')
With the scopes, you can only store data at the 'card' scope when a card is in scope
So for example in the context of 'card-badges' or 'attachment-sections', but not 'board-badges' or 'show-settings'
Also keep in mind storing at the 'organization' scope will only work if the active user is a member of the team

Information that is private to the current user, such as tokens should be stored using 'private' at the 'member' scope

t.set('organization', 'private', 'key', 'value');
t.set('board', 'private', 'key', 'value');
t.set('card', 'private', 'key', 'value');
t.set('member', 'private', 'key', 'value');

Information that should be available to all users of the Power-Up should be stored as 'shared'

t.set('organization', 'shared', 'key', 'value');
t.set('board', 'shared', 'key', 'value');
t.set('card', 'shared', 'key', 'value');
t.set('member', 'shared', 'key', 'value');

If you want to set multiple keys at once you can do that like so

t.set('board', 'shared', { key: value, extra: extraValue });

Reading back your data is as simple as

t.get('organization', 'shared', 'key');

Or want all in scope data at once?

t.getAll();

*/



var getBadges = function(t){

    return [{
      // dynamic badges can have their function rerun after a set number
      // of seconds defined by refresh. Minimum of 10 seconds.
      dynamic: function(){
        // we could also return a Promise that resolves to this as well if we needed to do something async first
        return {
          title: 'Detail Badge', // for detail badges only
          text: 'Dynamic ' + (Math.random() * 100).toFixed(0).toString(),
          icon: GRAY_ICON, // for card front badges only
          color: randomBadgeColor(),
          refresh: 10 // in seconds
        };
      }
    }, {
      // its best to use static badges unless you need your badges to refresh
      // you can mix and match between static and dynamic
      title: 'Detail Badge', // for detail badges only
      text: 'Static',
      icon: GRAY_ICON, // for card front badges only
      color: null
    }, {
      // card detail badges (those that appear on the back of cards)
      // also support callback functions so that you can open for example
      // open a popup on click
      title: 'Popup Detail Badge', // for detail badges only
      text: 'Popup',
      icon: GRAY_ICON, // for card front badges only
      callback: function(context) { // function to run on click
        return context.popup({
          title: 'Card Detail Badge Popup',
          url: './settings.html',
          height: 184 // we can always resize later, but if we know the size in advance, its good to tell Trello
        });
      }
    }, {
      // or for simpler use cases you can also provide a url
      // when the user clicks on the card detail badge they will
      // go to a new tab at that url
      title: 'URL Detail Badge', // for detail badges only
      text: 'URL',
      icon: GRAY_ICON, // for card front badges only
      url: 'https://trello.com/home',
      target: 'Trello Landing Page' // optional target for above url
    }];
  });
};





// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
  'card-badges': function(t, options){
    return getBadges(t);
  },
  'card-buttons': function(t, options) {
    return [{
              icon: W2P_ICON,
              text: 'Add W2P link',
              callback: function(t){
                return t.popup({
                  title: "W2P Link",
                  url: '../views/w2p.html'
                });
              }
            },
            {
              icon: GITLAB_ICON,
              text: 'Add Git link',
              callback: function(t){
                return t.popup({
                  title: "Git link",
                  url: '../views/gitlab.html'
                });
              }
            }];
  },
  'card-detail-badges': function(t, options) {
    return getBadges(t);
  }
});

console.log('Loaded by: ' + document.referrer);