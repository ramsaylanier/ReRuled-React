import React from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin';

import Settings from '../../settings.js';
import PageAnimations from './PageAnimations.js';
import { AnimateItem, resetCounts } from '../../animations.js'

import styles from './page.scss';
import wrapperStyles from '../../Stylesheets/wrapper.scss';

// Write your package code here!
const Page = React.createClass({

	componentDidMount(){
		resetCounts();
		CurrentPageRef = this.refs.page;

		if (Settings.AnimatePages){
			var item = ReactDOM.findDOMNode(this.refs.page);
			var animation = this.props.animation || PageAnimations.animateIn;
			AnimateItem(item, PageAnimations.animateIn);
		}
	},

	render(){
		let className = this.props.className || styles.base;
		let children = this.props.children;

		let bg = this.props.backgroundImage && {
			backgroundImage: "url('" + this.props.backgroundImage + "')",
		};

		return(
				<div ref="page" className={className} style={bg}>
					{children}
				</div>
		)
	}
});

const PageHero = React.createClass({
	render(){

		let className = styles.hero;
		let contentClassName = styles.hero__content;
		let wrapperClassName = wrapperStyles.main;
		var heroImage = this.props.heroImage || null;

		var style = {
			backgroundImage: "url('" + heroImage + "')"
		}

		return (
			<div className={className} style={style}>
				<div className={wrapperClassName}>
					<div className={contentClassName}>
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
})

const PageHeader = React.createClass({

	render: function(){

		var bg = this.props.backgroundImage && {
			backgroundImage: "url('" + this.props.backgroundImage + "')",
		};

		return (
			<div className="page-header" style={bg}>
				{this.props.children}
			</div>
		)
	}
});

const PageTitle = React.createClass({
	render(){

		let className = styles.title;

		return (
			<h1 className={className}>{this.props.children}</h1>
		)
	}
});

const PageContent = React.createClass({
	render(){

		let className = styles.content;
		let wrapperClassName = wrapperStyles[this.props.wrapperType] || wrapperStyles.main;

		return(
			<div className={className}>
				<div className={wrapperClassName}>
					{this.props.children}
				</div>
			</div>
		)
	}
})

const PageSection = React.createClass({
	render:function(){
		return(
			<section className={"page-section " + this.props.className}>
				<div className="wrapper">
					<h1>TEST</h1>
					{this.props.children}
				</div>

				{this.props.separator && <PageSeparator/>}
			</section>
		)
	}
});

const PageSeparator = React.createClass({
	render: function(){
		return(
			<div className="page-separator">
			</div>
		)
	}
});

export { Page, PageHero, PageHeader, PageTitle, PageContent, PageSection, PageSeparator };
