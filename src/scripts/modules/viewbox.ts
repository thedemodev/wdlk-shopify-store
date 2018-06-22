interface ViewBoxInit {
  minX: number;
  minY: number;
  width: number;
  height: number;
}

export class ViewBox {
  private minX: number;
  private minY: number;
  private width: number;
  private height: number;

  public constructor(init: ViewBoxInit) {
    this.minX = init.minX;
    this.minY = init.minY;
    this.width = init.width;
    this.height = init.height;
  }

  public setWidth(width: number): void {
    this.width = width;
  }
  public setHeight(height: number): void {
    this.height = height;
  }

  public getValues(): string {
    return `${this.minX} ${this.minY} ${this.width} ${this.height}`;
  }
}
