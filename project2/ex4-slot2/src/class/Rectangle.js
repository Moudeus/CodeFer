import React from "react";
import Shape from "./Shape";
class Rectangle extends Shape {
  constructor(length, width, color) {
    super(color);
    this.length = length;
    this.width = width;
  }

  getArea() {
    return this.length * this.width;
  }

  toString() {
    return <>Area of Rectangle : {this.getArea}</>;
  }
}

export default Rectangle;
