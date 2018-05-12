export interface StorageVisibilityProps {
  isVisible: boolean;
  setInitialValue(): boolean;
  toggleVisibility(): string;
  handleEvent(e: Event): void;
}

export function StorageVisibilityFactory(name: string): StorageVisibilityProps {
  return {
    isVisible: JSON.parse(localStorage.getItem(name)),
    setInitialValue(): boolean {
      if (JSON.parse(localStorage.getItem(name)) === null) {
        localStorage.setItem(name, 'true');
        this.isVisible = true;
        return this.isVisible;
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
