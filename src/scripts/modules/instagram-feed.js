import jsonp from 'jsonp';
import {access} from '../../../tasks/instagram/access';

export default function generateFeed () {
	const nodeList = document.querySelector('.js_instagramFeed');
    if (!nodeList) {
    	return;
    }

    const feedLimit = 9;
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
	const limitArr = value => value <= feedLimit;
	const filteredArr = arr => arr.filter((el, i) => limitArr(i));
	const generateImgs = arr => {
		arr.forEach(el => {
			let nodeItem = document.createElement('li');
			nodeItem.className = 'Media-item';
			nodeList.insertBefore(nodeItem, null)
		})
	};


	getMediaFeed(instaURL).then(res => {
		const feedData = filteredArr(res.data);
		generateImgs(feedData);
		console.log('this is the new feed', feedData);
	});

}
