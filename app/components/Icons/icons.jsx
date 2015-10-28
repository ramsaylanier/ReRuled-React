import React from 'react';
import styles from './icons.scss';

const PlusIcon = <svg version="1.1" className={styles.plus} x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50">
					<line fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="25" y1="3.6" x2="25" y2="46.4"/>
					<line ill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="6" y1="25" x2="44" y2="25"/>
				</svg>

const BackIcon = <svg version="1.1" className="back-icon deck-icon icon" x="0px" y="0px" viewBox="0 0 40 40" enable-background="new 0 0 40 40">
					<path d="M38.3,20c0,0.7-0.6,1.3-1.3,1.3l-30,0c2.7,1.9,6.2,4.4,8.2,5.8c0.6,0.4,0.7,1.2,0.3,1.8c-0.2,0.3-0.6,0.5-1,0.5
			c-0.3,0-0.5-0.1-0.7-0.2c-4.1-2.9-10.7-7.6-11.4-8c0,0,0,0,0,0c0,0,0,0,0,0C2.2,21,2.1,21,2.1,20.9c0,0-0.1-0.1-0.1-0.1
			c0,0-0.1-0.1-0.1-0.1c-0.1-0.1-0.1-0.2-0.1-0.3c-0.1-0.4,0-0.9,0.3-1.2C2.1,19,2.2,19,2.3,18.9c3.4-2.4,11-7.8,11.7-8.2
			c0.6-0.3,1.4-0.1,1.7,0.6c0.3,0.6,0.1,1.4-0.5,1.7c-0.5,0.3-4.5,3.1-8.2,5.7l30.1,0C37.7,18.7,38.3,19.3,38.3,20z"/>
				</svg>

const MenuIcon = <div className="menu-icon deck-icon icon" x="0px" y="0px" viewBox="0 0 40 40" enable-background="new 0 0 40 40">
					<div className="bar bar-1"></div>
					<div className="bar bar-2"></div>
					<div className="bar bar-3"></div>
				</div>

const SearchIcon = <svg version="1.1" className="search-icon nav-icon icon" x="0px" y="0px" viewBox="-379 281 40 40" enable-background="new -379 281 40 40">
					<path d="M-341.1,317.3l-10.7-10.7c2.4-2.6,3.8-6.1,3.8-9.9c0-8.1-6.6-14.6-14.6-14.6c-8.1,0-14.6,6.6-14.6,14.6
					s6.6,14.6,14.6,14.6c3.4,0,6.5-1.1,8.9-3.1l10.7,10.8c0.2,0.2,0.6,0.4,0.9,0.4s0.6-0.1,0.9-0.4
					C-340.6,318.6-340.6,317.8-341.1,317.3z M-354.4,305.7C-354.4,305.7-354.4,305.7-354.4,305.7c-2.2,2-5,3.2-8.2,3.2
					c-6.7,0-12.1-5.4-12.1-12.1s5.4-12.1,12.1-12.1c6.7,0,12.1,5.4,12.1,12.1C-350.4,300.3-351.9,303.5-354.4,305.7z"/>
				</svg>

const LogoIcon = <svg version="1.1" className={styles.logo} x="0px" y="0px" viewBox="0 0 200 200" enable-background="new 0 0 200 200">
			<path id="XMLID_18_" fill="#F26425" d="M40.1,28.8c0-2.5,2-4.5,4.5-4.5h24.2c2.5,0,4.5,2,4.5,4.5V36c0,2.5,2,4.5,4.5,4.5h33.6
				c2.5,0,4.5,2,4.5,4.5v26.4c0,2.5-2,4.5-4.5,4.5l-33.4,0c-2.5,0-4.5,2-4.5,4.5V155c0,2.5-2,4.5-4.5,4.5l-24.4,0
				c-2.5,0-4.5-2-4.5-4.5V28.8z"/>
			<path id="XMLID_19_" fill="#69CBDB" d="M159.9,171.2c0,2.5-2,4.5-4.5,4.5l-24.2,0c-2.5,0-4.5-2-4.5-4.5V164c0-2.5-2-4.5-4.5-4.5
				l-33.6,0c-2.5,0-4.5-2-4.5-4.5l0-26.4c0-2.5,2-4.5,4.5-4.5l33.5,0.1c2.5,0,4.5-2,4.5-4.5V45c0-2.5,2-4.5,4.5-4.5l24.3,0
				c2.5,0,4.5,2,4.5,4.5L159.9,171.2z"/>
		</svg>

const TwitterIcon = <svg className={styles.twitter} x="0px" y="0px" viewBox="0 0 40 40" enable-background="new 0 0 40 40">
			<path fill="#010101" d="M38.9,8.3c-1.4,0.6-2.9,1-4.4,1.2c1.6-1,2.8-2.5,3.4-4.3c-1.5,0.9-3.2,1.5-4.9,1.9
				c-1.4-1.5-3.4-2.4-5.7-2.4c-4.3,0-7.7,3.5-7.7,7.7c0,0.6,0.1,1.2,0.2,1.8c-6.4-0.3-12.1-3.4-16-8.1c-0.7,1.1-1,2.5-1,3.9
				c0,2.7,1.4,5.1,3.4,6.4c-1.3,0-2.5-0.4-3.5-1c0,0,0,0.1,0,0.1c0,3.8,2.7,6.9,6.2,7.6c-0.6,0.2-1.3,0.3-2,0.3c-0.5,0-1,0-1.5-0.1
				c1,3.1,3.8,5.3,7.2,5.4C9.9,30.7,6.6,32,3,32c-0.6,0-1.2,0-1.8-0.1c3.4,2.2,7.5,3.5,11.9,3.5c14.2,0,22-11.8,22-22c0-0.3,0-0.7,0-1
				C36.5,11.2,37.8,9.8,38.9,8.3z"/>
			</svg>

export { PlusIcon, BackIcon, MenuIcon, SearchIcon, LogoIcon, TwitterIcon };
