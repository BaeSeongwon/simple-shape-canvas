import uuid from "react-uuid";

class Shape {
  #left;
  #top;
  #id;
  #width;
  #height;
  #border;
  #position;
  #initLeft;
  #initTop;
  #zIndex;

  constructor(left, top) {
    left = left ? left : 0;
    top = top ? top : 0;

    this.#id = uuid();
    this.#width = '5px';
    this.#height = '5px';
    this.#border = '1px solid black';
    this.#position = 'absolute';
    this.#left = `${left}px`;
    this.#top = `${top}px`;
    this.#initLeft = left;
    this.#initTop = top;
  }

  init(left, top, zIndex) {
    this.#left = `${left}px`;
    this.#top = `${top}px`;
    this.#initLeft = left;
    this.#initTop = top;
    this.#width = '5px';
    this.#height = '5px';
    this.#zIndex = zIndex;
  }

  getId() {
    return this.#id;
  }

  getShapeInfo() {
    return {
      width: this.#width,
      height: this.#height,
      border: this.#border,
      position: this.#position,
      left: this.#left,
      top: this.#top,
      borderRadius: this.borderRadius,
      zIndex: this.#zIndex
    }
  }

  setShapeInfo() {

  }

  getInitLeft() {
    return this.#initLeft;
  }

  getInitTop() {
    return this.#initTop;
  }

  getLeft() {
    return this.#left;
  }

  getTop() {
    return this.#top;
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
  }

  setWidth(width) {
    this.#width = width;
  }

  setHeight(height) {
    this.#height = height;
  }

  setTop(top) {
    this.#top = top;
  }

  setLeft(left) {
    this.#left = left;
  }
}

export default Shape;