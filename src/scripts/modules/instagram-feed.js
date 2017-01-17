import jsonp from 'jsonp';
import {access} from '../../../tasks/instagram/access';

export default function generateFeed () {
	const node = document.querySelector('.js_instagramFeed');
    if (!node) {
    	return;
    }

	const instaURL = `https://api.instagram.com/v1/users/${access['id']}/media/recent/?access_token=${access['token']}&callback=callback`;

	const getMediaFeed = url => {
		return new Promise((resolve, reject) => {
			jsonp(url, (err, data) => {
				if (err) {
					reject(Error(`Couldn't get Insta JSON feed; error code: + ${err}`));
					throw err;
				}
				resolve(data);
			});

		});
	};

	const limitArr = value => value <= 10;
	const filteredArr = arr => arr.filter((el, i) => limitArr(i));


	getMediaFeed(instaURL).then(res => {
		const feedData = filteredArr(res.data);
		console.log('this is the new feed', feedData);
	});

}
