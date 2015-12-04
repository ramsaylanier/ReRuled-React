import React from 'react';
import { LogoIcon } from '../Icons/icons.jsx';

import styles from './loading.scss';

const Loading = React.createClass({

  componentDidMount(){
    let count = 0;
    let container = this.container;
    let left = $(container).find('.left-r');
    let right = $(container).find('.right-r');
    let dX = -15;
    let dY = -15;
    let rotation = 0;
    let duration = .5;

    TweenMax.to(left, duration, {
      x: dX,
      y: dY,
      rotation: rotation,
      repeat: 10,
      yoyo: true,
      ease:Power4.easeInOutQuant
    })

    TweenMax.to(right, duration, {
      x: -dX,
      y: -dY,
      rotation: -rotation,
      repeat: 10,
      yoyo: true,
      ease:Power4.easeInOutQuant
    })
  },

  componentWillUnmount(){
    TweenMax.killTweensOf(this.container);
  },

  render(){
    return(
      <div ref={ (c) => this.container = c } className={styles.container}>{LogoIcon}</div>
    )
  }
});

export default Loading;
