import * as Graph from '../../../configuration/instagram/';
import * as Component from './templates';

export interface FeedInit {
    mountEl: HTMLElement;
    postLimit?: number;
}

export interface IstagramMedia {
  caption: string;
  comments_count: number;
  id: string;
  like_count: number;
  media_type: string;
  media_url: string;
  permalink: string;
  thumbnail_url: string;
  taken_at: number;
}

export interface InstagramId {
  id: string;
}

const getMediaURL = (id: string) => `https://graph.facebook.com/v3.2/${id}/?access_token=${Graph.access.token}&fields=media_type,media_url,thumbnail_url,permalink,caption,comments_count,like_count`;

export async function fetchMediaData(id: string): Promise<IstagramMedia> {
  try {
    const r = await fetch(getMediaURL(id));
    const d = await r.json();
    if (r.status !== 200) {
      console.log(`There was a problem fetching media data. Status code: ${r.status}`);
      return;
    }
    return d;
  } catch (err) {
    console.log(`IG media data fetch error: ${err}`);
  }
}

// tslint:disable-next-line:no-any
export async function fetchMedia(url: string): Promise<any> {
  try {
    const r = await fetch(url);
    const d = await r.json();

    if (r.status !== 200) {
      console.log(`There was a problem fetching the media id's. Status code: ${r.status}`);
      return;
    }

    const list = await Promise.all(d.data.map((l: InstagramId) => fetchMediaData(l.id)));

    return list;
  } catch (err) {
    console.log(`IG media fetch error: ${err}`);
  }
}

const media = fetchMedia(`https://graph.facebook.com/v3.2/${Graph.access.id}/media?access_token=${Graph.access.token}`);

export function create({ mountEl, postLimit }: FeedInit): void {
  media.then(data => {
    mountEl.innerHTML = data
      .filter((post: IstagramMedia, i: number) => i <= postLimit - 1)
      .map((post: IstagramMedia, i: number) => (
      Component.Feed({
        i,
        user: 'WDLK',
        caption: Component.Caption({
          caption: post.caption,
          likes: post.like_count,
          user: 'WDLK'
        }),
        media: Component.Media({
          link: post.permalink,
          src: post.media_url
        }),
        thumbnail: Component.Thumbnail({
          i,
          imgURL: post.thumbnail_url || post.media_url,
          thumbnailURL: post.thumbnail_url || post.media_url
        })
      })
    )).join('');
  });
}
