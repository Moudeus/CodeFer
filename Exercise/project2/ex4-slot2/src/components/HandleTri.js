import { useState, memo, useEffect } from "react";
import Triangle from "../class/Triangle.js";

const HandleTri = () => {
  const [base, setbase] = useState(0);
  const [height, setheight] = useState(0);
  const [area, setArea] = useState(0);

  useEffect(() => {
    const rec = new Triangle(base, height, "red");
    setArea(rec.getArea());
  }, [base, height]);

  return (
    <>
      <input onChange={(e) => setbase(Number(e.target.value))} placeholder="base" />
      <input onChange={(e) => setheight(Number(e.target.value))} placeholder="height" />
      <div>Triangle Area: {area}</div>
    </>
  );
};

export default memo(HandleTri);
