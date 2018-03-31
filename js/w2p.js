var t = TrelloPowerUp.iframe();

window.estimate.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('card', 'shared', 'w2plink', window.w2plink.value)
  .then(function(){
    t.closePopup();
  });
});


t.render(function(){
  return t.get('card', 'shared', 'w2plink')
  .then(function(link){
    window.w2plink.value = link;
  })
  .then(function(){
    t.sizeTo('#w2p').done();
  });
});