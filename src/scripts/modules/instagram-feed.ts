import { access } from '../../../configuration/instagram/access';
import jsonp from 'jsonp';

export interface InstagramPost {
  caption: {
    text: string;
  };
  created_time: number;
  images: {
    low_resolution: {
      url: string;
    };
    standard_resolution: {
      url: string;
    };
    thumbnail:  {
      url: string;
    };
  };
  likes: {
    count: number;
  };
  link: string;
  tags: string[];
  user: {
    username: string;
  };
}

export interface InstagramData {
  data: InstagramPost[];
  meta: 200;
  pagination: object;
}

export default function instagramFeed(): void {
  const node: HTMLElement = document.querySelector('.js_instagramFeed');
  if (!node) {
    return;
  }
  if (typeof Promise === undefined) {
    return;
  }

  const feedLimit = 11;
  const instaURL = `https://api.instagram.com/v1/users/${access['id']}/media/recent/?access_token=${access['token']}&callback=callback`;

  // tslint:disable-next-line
  const getMediaFeed = (url: string): Promise<InstagramData> => (
    new Promise((resolve, reject) => {
      jsonp(url, (err: Error, data: InstagramData) => {
        if (err) {
          reject(Error(`Couldn't get Insta JSON feed; error code: + ${err}`));
          throw err;
        }
        resolve(data);
      });
    })
  );

  const limitArr = (value: number): boolean => value <= feedLimit;
  const filteredArr = (arr: object[]) => arr.filter((el: object, i: number) => limitArr(i));
  const convertUnixDate = (timestamp: number) => {
    const date = new Date(parseInt(`${timestamp}`, 10));
    return date.toDateString().slice(0, -4);
  };

  const generateFeedTemplate = (arr: object[]): void => {
    const feedTemplate = arr.map((el: InstagramPost, i: number) => {
      const thumbnail = `
        <div class="Feed-thumbnail">
          <label class="Feed-trigger" for="lightbox-${i}" style="background-image: url(${el.images.standard_resolution.url}), linear-gradient(35deg, #FFCA54, #FF7163 80%)">
          </label>
          <img class="Feed-img"
            src="${el.images.standard_resolution.url}"
            srcset="${el.images.thumbnail.url} 150w,
            ${el.images.low_resolution.url} 320w,
            ${el.images.standard_resolution.url} 640w" />
        </div>
      `;

      const media = `
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
      `;

      const caption = `
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
      `;

      const feed = `
        <li class="Feed-item Lightbox--row">
          ${thumbnail}
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
              ${media}
              ${caption}
            </figure>
          </div>
        </li>
      `;
      return feed;
    });
    node.innerHTML = feedTemplate.join('');
  };

  getMediaFeed(instaURL).then((value: InstagramData) => generateFeedTemplate(filteredArr(value.data)) ,
  (reason: Error) => {
    console.log(`Couldn't get Insta JSON feed; error code: + ${reason}`);
  }
);

}
