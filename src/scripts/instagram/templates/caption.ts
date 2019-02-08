export interface CaptionProps {
  likes: number;
  caption: string;
  user: string;
}

const convertUnixDate = (timestamp: number) => {
  const date = new Date(parseInt(`${timestamp}`, 10));
  return date.toDateString().slice(0, -4);
};

export const Caption = ({ likes, caption, user }: CaptionProps): string => `
  <figcaption class="Feed-caption Lightbox-row">
  <strong class="Feed-highlight">${likes} likes</strong>
  <p class="Feed-copy">
  <strong>
    ${user}
  </strong>
    ${caption}
  </p>
  </figcaption>
`;
