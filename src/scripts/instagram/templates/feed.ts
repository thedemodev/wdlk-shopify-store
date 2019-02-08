export interface FeedProps {
  i: number;
  caption: string;
  media: string;
  thumbnail: string;
  user: string;
}

export const Feed = ({thumbnail, media, caption, i, user}: FeedProps): string => `
  <li class="Feed-item Lightbox--row">
  ${thumbnail}
    <input class="Lightbox-state" type="checkbox" id="lightbox-${i}" />
    <div class="Lightbox-shim">
      <label class="Lightbox-shim-close" for="lightbox-${i}"></label>
      <figure class="Lightbox-content">
        <header class="Lightbox-header">
          <h3 class="Headline Headline--6">
          ${user}
          </h3>
          <label class="Lightbox-icon" for="lightbox-${i}"></label>
        </header>
        ${media}
        ${caption}
      </figure>
    </div>
  </li>
`;
