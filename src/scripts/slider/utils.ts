export const cloneFirstLast = (nodeList: Element[]): Element[] =>
  nodeList.reduce((prev, curr: Element, i: number) => {
    if (i === 0 || i === nodeList.length - 1) {
      prev.push(curr.cloneNode(true));
    }
    return prev;
  }, []);

export const sanatizedNodes = (nodeList: Element[]): Element[] =>
  nodeList.map((node: Element) => {
    (node as HTMLElement).removeAttribute('tabindex');
    (node as HTMLElement).setAttribute('aria-hiden', 'true');
    return node;
  });
