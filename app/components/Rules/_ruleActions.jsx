import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { EyeIcon } from '../Icons/icons.jsx'
import Button from '../Button/button.jsx'
import styles from './actions.scss'

export default class RuleActions extends Component{

  constructor(props){
    super();
  }

  componentDidMount(){
    TweenMax.fromTo(this.refs.container, .5, {
      opacity: 0
    }, {
      opacity: 1
    })

    TweenMax.fromTo(this.refs.button, 1, {
      opacity: 0
    }, {
      opacity: 1
    })
  }

  render(){
    return(
      <div ref="container" className={styles.container}>
        <Button ref="button" action={this._onClick} type="icon">{ EyeIcon }</Button>
        <Button action={this._onClick} type="icon">{ EyeIcon }</Button>
      </div>
    )
  }

  _onClick(){

  }
}
