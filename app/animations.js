export function AnimateItem(item, animation){
	TweenMax.to(item, animation.duration, animation.properties)
}

export function resetCounts(){
	Session.set('ruleCount', 0);
	Session.set('rulesetCount', 0);
}
