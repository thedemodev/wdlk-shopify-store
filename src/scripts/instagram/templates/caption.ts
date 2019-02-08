export interface CaptionProps {
  likes: number;
  time: string;
  user: string;
  caption: string;
}

const convertUnixDate = (timestamp: number) => {
  const date = new Date(parseInt(`${timestamp}`, 10));
  return date.toDateString().slice(0, -4);
};

export const Caption = ({ likes, time, user, caption }: CaptionProps): string => `
  <figcaption class="Feed-caption Lightbox-row">
  <strong class="Feed-highlight">${likes} likes</strong>
  <time class="Feed-highlight" datetime="${convertUnixDate(time)}">${convertUnixDate(time)}</time>
  <p class="Feed-copy">
    <strong>
      ${user}
    </strong>
    ${caption}
  </p>
  </figcaption>
`;
