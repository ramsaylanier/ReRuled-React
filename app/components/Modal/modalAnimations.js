import ReactDOM from 'react-dom';

export function animateModalOut(){
  let page = $(ReactDOM.findDOMNode(CurrentPageRef));
  let modal = $('.modal__base');
  let dX = modal.outerWidth();

  TweenMax.to(page, .4, {
    x: "0%",
    ease: Power2.easeOut
  });

  TweenMax.to(modal, .4, {
    right: -window.innerWidth,
    ease: Power2.easeOut
  });

  Meteor.setTimeout(() => {
    this.props.actions.setCurrentModal(null);
    $('.modal__base').remove();
    $('body').removeClass('modal-active');
  }, 500);
}

export function animateModalIn(){
  let page = $(ReactDOM.findDOMNode(CurrentPageRef));
  let modal = $('.modal__base');

  let dX = modal.outerWidth() - ( (window.innerWidth - $('.wrapper__main').outerWidth()) / 2)

  TweenMax.to(page, .4, {
    x: -dX,
    ease: Power2.easeOut
  });

  TweenMax.to(modal, .4, {
    right: 0,
    ease: Power2.easeOut
  });

  $('body').addClass('modal-active');
}
