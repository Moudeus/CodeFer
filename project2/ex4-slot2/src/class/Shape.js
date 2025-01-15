import React from "react";
class Shape {
  constructor(color) {
    this.color = color;
  }

  toString() {
    return <>{this.color}</>;
  }
}

export default Shape;
