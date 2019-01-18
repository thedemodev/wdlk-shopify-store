import * as Graph from "../../../configuration/instagram/";

export interface IGFeedInit {
    mountEl: HTMLElement;
}

const urlMediaList = `https://graph.facebook.com/v3.2/${Graph.access.id}/media?access_token=${Graph.access.token}`;
const urlMdia = `https://graph.facebook.com/v3.2/[MEDIA_ID]?access_token=${Graph.access.token}&fields=media_type,media_url,thumbnail_url,permalink,caption;`


const mediaIDList = fetch(urlMediaList).then(response => {
    if (response.status !== 200) {
        console.log(`There was a problem with IG response. Status code: ${response.status}`);
        return;
    }
    return response.json().then(data => data);
})
.catch(error => console.log(`IG media fetch error: ${error}`));

export const mediaList = mediaIDList.then(data => console.log(data, '&&&&&&&&'));

console.log(mediaList)

export const create = ({ mountEl }: IGFeedInit): void => {
    console.log(mountEl, 'this shold be the element');
}