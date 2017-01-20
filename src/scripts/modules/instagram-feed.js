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
	const convertUnixDate = timestamp => {
		let date = new Date(parseInt(timestamp));
		return date.toDateString().slice(0, -4);
	};

	const createFeed = arr => {
		const feedTemplate = arr.map((el, i) => {
			let html = `
				<li class="Feed-item Lightbox--row">
					<label class="Feed-trigger" for="lightbox-${i}" style="background-image: url(${el.images.standard_resolution.url}), linear-gradient(35deg, #FFCA54, #FF7163 80%)">
					</label>
					<img class="Feed-img"
						src="${el.images.standard_resolution.url}"
						srcset="${el.images.thumbnail.url} 150w,
						${el.images.low_resolution.url} 320w,
						${el.images.standard_resolution.url} 640w" />
					<input class="Lightbox-state" type="checkbox" id="lightbox-${i}" />
					<div class="Lightbox-shim">
						<label class="Lightbox-shim-close" for="lightbox-${i}"></label>
						<figure class="Lightbox-content">
							<header class="Lightbox-header">
								<h3 class="Headline Headline--6">
									#${el.tags[0]}
								</h3>
								<label class="Lightbox-icon" for="lightbox-${i}"></label>
							</header>
							<a class="Lightbox-row Feed-media"
								href="${el.link}" target="_blank">
								<h4 class="Headline Headline--5">
									Join the journey on Instagram @wdlk
								</h4>
								<img class="Feed-img"
									src="${el.images.standard_resolution.url}"
									srcset="${el.images.thumbnail.url} 150w,
									${el.images.low_resolution.url} 320w,
									${el.images.standard_resolution.url} 640w" />
							</a>
							<figcaption class="Feed-caption Lightbox-row">
								<strong class="Feed-highlight">${el.likes.count} likes</strong>
								<time class="Feed-highlight" datetime="${convertUnixDate(el.created_time)}">${convertUnixDate(el.created_time)}</time>
								<p class="Feed-copy">
									<strong>
										${el.user.username}
									</strong>
									${el.caption.text}
								</p>
							</figcaption>
						</figure>
					</div>
				</li>
			`;
			return html;
		});
		node.innerHTML = feedTemplate.join('');
	};


	getMediaFeed(instaURL).then(res => {
		const feedData = filteredArr(res.data);
		createFeed(feedData);
	});

}
