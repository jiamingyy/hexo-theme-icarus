'use strict';

const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('../util/cache');

class Facebook extends Component {
    render() {
        const { language, permalink } = this.props;
        const js = `(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/${(language || 'en').split('-').join('_')}/sdk.js#xfbml=1&version=v2.8";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));`;
        return <Fragment>
            <div className="fb-comments" data-width="100%" data-href={permalink} data-num-posts="5"></div>
            <script dangerouslySetInnerHTML={{ __html: js }}></script>
        </Fragment>;
    }
}

module.exports = cacheComponent(Facebook, 'comment.facebook', props => {
    return {
        language: props.language,
        permalink: props.page.permalink
    };
});
