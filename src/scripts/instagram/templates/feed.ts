export interface FeedProps {
  i: number;
  caption: string;
  media: string;
  // tags: string[];
  thumbnail: string;
}

export const Feed = ({thumbnail, media, caption, i}: FeedProps): string => `
  <li class="Feed-item Lightbox--row">
  ${thumbnail}
    <input class="Lightbox-state" type="checkbox" id="lightbox-${i}" />
    <div class="Lightbox-shim">
      <label class="Lightbox-shim-close" for="lightbox-${i}"></label>
      <figure class="Lightbox-content">
        <header class="Lightbox-header">
          <label class="Lightbox-icon" for="lightbox-${i}"></label>
        </header>
        ${media}
        ${caption}
      </figure>
    </div>
  </li>
`;
