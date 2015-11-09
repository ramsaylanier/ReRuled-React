export function animateModalIn(){
  let page = $('.page__base');
  let modal = $('.modal__base');
  let dX = window.innerWidth / 10;

  let overlay = $("<div class='page__overlay'></div>")

  page.append(overlay);

  TweenMax.to(modal, .4, {
    right: 0,
    ease: Power2.easeOut
  });

  TweenMax.to(overlay, .4, {
    opacity: 1
  })
}

export function animateModalOut(){
  let modal = $('.modal__base');
  let overlay = $('.page__overlay');
  let dX = modal.outerWidth();

  TweenMax.to(modal, .4, {
    right: -window.innerWidth,
    ease: Power2.easeOut
  });

  TweenMax.to(overlay, .4, {
    opacity: 0
  })

  Meteor.setTimeout( () => {
    overlay.remove();
  }, 400)
}
