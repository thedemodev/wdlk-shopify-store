import * as Graph from '../../../configuration/instagram/';

export interface FeedInit {
    mountEl: HTMLElement;
}

export interface IstagramMedia {
  caption: string;
  comments_count: number;
  id: string;
  like_count: number;
  media_type: string;
  media_url: string;
  permalink: string;
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
    const ids = await r.json();

    if (r.status !== 200) {
      console.log(`There was a problem fetching the media id's. Status code: ${r.status}`);
      return;
    }
    const results = await Promise.all(ids.data.map((data: { id: string }) => fetchMediaData(data.id)));

    return results;
  } catch (err) {
    console.log(`IG media fetch error: ${err}`);
  }
}

const result = fetchMedia(`https://graph.facebook.com/v3.2/${Graph.access.id}/media?access_token=${Graph.access.token}`);

result.then(data => console.log(data, 'getting the data another way###'));

export function create({ mountEl }: FeedInit): void {
  console.log(mountEl, 'this shold be the element');
}
