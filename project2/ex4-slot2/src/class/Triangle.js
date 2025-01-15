import React from "react";
import Shape from "./Shape";
class Triangle extends Shape {
  constructor(base, height, color) {
    super(color);
    this.base = base;
    this.height = height;
  }

  getArea() {
    return (this.base * this.height) / 2;
  }

  toString() {
    return <>Area of Triangle : {this.getArea}</>;
  }
}

export default Triangle;
