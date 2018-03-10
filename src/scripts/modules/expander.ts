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

export const initExpander = () => {
  expander(
    document.querySelectorAll('.js_content'),
    document.querySelectorAll('.js_expander')
  );
};
