class ShapeManager {
  #isDragState = false;
  #shape = null;

  constructor() {
    if(!ShapeManager.instance) {
      ShapeManager.instance = this;
    }

    return ShapeManager.instance;
  }

  setShape(shape) {
    if(shape) {
      this.#shape = shape;
    }
  }

  getShape() {
    return this.#shape;
  }

  setDragState(isDragState) {
    if(typeof isDragState === 'boolean') {
      this.#isDragState = isDragState;
    }
  }

  getDragState() {
    return this.#isDragState;
  }

  updateShapeSize(left, top) {
    if(this.#isDragState && this.#shape) {
      this.#shape.setWidth(`${Math.abs(this.#shape.getInitLeft() - parseInt(left))}px`);
      this.#shape.setHeight(`${Math.abs(this.#shape.getInitTop() - parseInt(top))}px`);

      if(this.#shape.getInitLeft() - parseInt(left) > 0) {
        this.#shape.setLeft(`${left}px`);
      }

      if(this.#shape.getInitTop() - parseInt(top) > 0) {
        this.#shape.setTop(`${top}px`);
      }

      if(this.#shape.getType() === "circle") {
        this.#shape.setBorderRadius(`${this.#shape.getWidth()} / ${this.#shape.getHeight()}`);
      }

      return {
        width: this.#shape.getWidth(),
        height: this.#shape.getHeight(),
        left: this.#shape.getLeft(),
        top: this.#shape.getTop(),
        borderRadius: this.#shape.getBorderRadius()
      }
    } else {
      return null;
    }
  }
}

export default ShapeManager;