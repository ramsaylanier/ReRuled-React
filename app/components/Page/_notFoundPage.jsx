import React from 'react';
import { Page, PageHero, PageTitle, PageContent} from './page.jsx';

const NotFoundPage = React.createClass({
	render(){
		return(
			<Page>
				<PageHero classes="not-found-hero" heroImage={"http://media0.giphy.com/media/mPytjcsG3XS4o/giphy.gif"}>
					<PageTitle>You Must Be Lost</PageTitle>
				</PageHero>
				<PageContent>
					<p>We could not find anything that matched your shit. <a href="/" className="transition-link">Try again?</a></p>
				</PageContent>
			</Page>
		)
	}
});

export default NotFoundPage;
