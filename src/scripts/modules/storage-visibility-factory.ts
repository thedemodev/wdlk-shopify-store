export interface StorageVisibilityProps {
  isVisible: boolean;
  setInitialValue(): void;
  toggleVisibility(): string;
  handleEvent(e: Event): void;
}

export function StorageVisibilityFactory(name: string): StorageVisibilityProps {
  return {
    isVisible: JSON.parse(localStorage.getItem(name)),
    setInitialValue(): void {
      if (JSON.parse(localStorage.getItem(name)) === null) {
        localStorage.setItem(name, 'true');
      }
    },
    toggleVisibility(): string {
      this.isVisible = !this.isVisible;
      return this.isVisible.toString();
    },
    handleEvent(e: Event): void {
      localStorage.setItem(name, this.toggleVisibility());
    }
  };
}

export default StorageVisibilityFactory;
