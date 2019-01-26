export interface ThumbnailProps {
  imgURL: string;
  thumbnailURL: string;
  i: number;
}

export const Thumbnail = ({thumbnailURL, imgURL, i}: ThumbnailProps): string => `
  <div class="Feed-thumbnail">
    <label class="Feed-trigger" for="lightbox-${i}" style="background-image: url(${thumbnailURL}), linear-gradient(35deg, #FFCA54, #FF7163 80%)">
    </label>
    <img class="Feed-img" src="${imgURL}" />
  </div>
`;
