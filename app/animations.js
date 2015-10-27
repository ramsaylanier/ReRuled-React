const	AnimateItem = function(item, animation){
	TweenMax.to(item, animation.duration, animation.properties)
}

export default AnimateItem;
