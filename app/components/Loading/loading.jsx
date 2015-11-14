import React from 'react';
import { LogoIcon } from '../Icons/icons.jsx';

import styles from './loading.scss';

const Loading = React.createClass({

  componentDidMount(){
    let count = 0;
    let container = this.container;
    console.log($(container));
    let left = $(container).find('.left-r');
    let right = $(container).find('.right-r');
    let dX = 0;
    let dY = 15;
    let rotation = 0;

    console.log(right);
    TweenMax.to(left, .35, {
      x: dX,
      y: dY,
      rotation: rotation,
      repeat: 10,
      yoyo: true,
      ease:Power4.easeOutQuant
    })

    TweenMax.to(right, .35, {
      x: -dX,
      y: -dY,
      rotation: -rotation,
      repeat: 10,
      yoyo: true,
      ease:Power4.easeOutQuant
    })
  },

  componentWillUnmount(){
    console.log('unmounting');
    TweenMax.killTweensOf(this.container);
  },

  render(){
    return(
      <div ref={ (c) => this.container = c } className={styles.container}>{LogoIcon}</div>
    )
  }
});

export default Loading;
