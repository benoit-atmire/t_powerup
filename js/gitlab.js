var t = TrelloPowerUp.iframe();

window.estimate.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('card', 'shared', 'gitlab', window.gitlab.value)
  .then(function(){
    t.closePopup();
  });
});


t.render(function(){
  return t.get('card', 'shared', 'gitlab')
  .then(function(link){
    window.w2plink.value = link;
  })
  .then(function(){
    t.sizeTo('#git').done();
  });
});