export interface MediaProps {
  src: string;
  link: string;
}

export const Media = ({ link, src }: MediaProps): string => `
  <a class="Lightbox-row Feed-media" href="${link}" target="_blank">
    <h4 class="Headline Headline--5">
      Join the journey on Instagram @wdlk
    </h4>
    <img class="Feed-img"
      src="${src}"
      srcset="${src} 150w,
      ${src} 320w,
      ${src} 640w" />
  </a>
`;
