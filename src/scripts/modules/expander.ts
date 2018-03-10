import { smoothScrolling } from './smooth-scrolling';
export type HTMLInputEvent<T extends HTMLInputElement> = Event & {
  target: T;
};

export const expander = (
  contentList: NodeListOf<Element>,
  paneList: NodeListOf<Element>
): void => {
  if (paneList.length === 0) {
    return;
  }
  if (contentList.length === 0) {
    return;
  }
  const root: HTMLElement = document.querySelector(':root');
  if (root.offsetWidth > 768) {
    return;
  }

  const heightList = [...contentList].map(
    (el: HTMLElement): number => el.offsetHeight
  );

  const setCssVariables = (
    nodeList: NodeListOf<Element>,
    numbers: number[]
  ) => {
    [...nodeList].forEach((el: HTMLElement, i: number) => {
      el.style.setProperty('--pane-height', `${numbers[i]}`);
    });
  };

  setCssVariables(paneList, heightList);
};

export const resetState = (
  inputList: NodeListOf<Element>,
  paneList: NodeListOf<Element>
) => {
  if (inputList.length === 0) {
    return;
  }

  const resetPosition = () => {
    paneList.forEach((pane: HTMLElement) => {
      pane.scrollTop = 0;
    });
  };

  [...inputList].forEach((input: HTMLInputElement) => {
    input.addEventListener('click', resetPosition);
  });
};

export const initExpander = () => {
  const panes = document.querySelectorAll('.js_expander');
  resetState(document.querySelectorAll('.js_state'), panes);
  expander(document.querySelectorAll('.js_content'), panes);
  smoothScrolling(document.querySelectorAll('.js_expander_lead'), panes);

};
