export interface ViewBoxProps {
  minX: number;
  minY: number;
  width: number;
  height: number;
}

export interface ViewBoxFactoryProps {
  minX: number;
  minY: number;
  width: number;
  height: number;
  getWidth(): number;
  getHeight(): number;
  getViewBox(): string;
  setWidth(width: number): void;
  setHeight(height: number): void;
}

export function ViewBox(init: ViewBoxProps): ViewBoxFactoryProps {
  return {
    minX: init.minX,
    minY: init.minY,
    width: init.width,
    height: init.height,
    getWidth(): number {
      return this.width;
    },
    getHeight(): number {
      return this.height;
    },
    getViewBox(): string {
      return `${this.minX} ${this.minY} ${this.width} ${this.height}`;
    },
    setWidth(width: number): void {
      this.width = width;
    },
    setHeight(height: number): void {
      this.height = height;
    }
  };
}
