const PageAnimations = {
	defaults: {
		duration: .1,
		properties: {
			opacity: 1,
			ease: Power2.easeOut
		}
	}
}

PageAnimations.animateIn = {
	duration: PageAnimations.defaults.duration,
	properties: PageAnimations.defaults.properties
}

PageAnimations.animateOut = {
	duration: PageAnimations.defaults.duration,
	properties: {
		opacity: 0,
		ease: Power2.easeOut
	}
}

export default PageAnimations;
