import jsonp from 'jsonp';
import {access} from '../../../tasks/instagram/access';

export default function generateFeed () {
	const node = document.querySelector('.js_instagramFeed');
	if (!node) return;
	if (typeof Promise === undefined) return;

	const feedLimit = 11;
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
	const createNode = (el, classname, attr, attrValue, id) => {
		if (el === 'img') {
			el = new Image();
		} else {
			el = document.createElement(`${el}`);
		}

		el.className = `${classname}`;

		if (attr) {
 			el[attr] = `${attrValue}`;
		}

		if (id) {
			el.id =`${id}`;
		}

		return el;
	};

	const createFeed = arr => {
		const foo = arr.map(el => {
			let html = `
				<li class="Feed-item">
					<img class="Feed-img" src="${el.images.standard_resolution.url}" />
					<input class="Lightbox-state" type="checkbox" id="lightbox" />
					<div class="Lightbox-shim">
						<figure class="Lightbox-content js_image">
							<img class="Feed-img" src="${el.images.standard_resolution.url}" />
							<figcaption class="Feed-caption js_caption">
								${el.caption.text}
							</figcaption>
						</figure>
					</div>
				</li>
			`;
			return html;
		});

		node.innerHTML = foo.join();
	};



	getMediaFeed(instaURL).then(res => {
		const feedData = filteredArr(res.data);
		createFeed(feedData);
	});

}
