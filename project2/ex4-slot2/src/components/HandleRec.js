import { useState, memo, useEffect } from "react";
import Rectangle from "../class/Rectangle.js";

const HandleRec = () => {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [area, setArea] = useState(0);

  useEffect(() => {
    const rec = new Rectangle(length, width, "red");
    setArea(rec.getArea());
  }, [length, width]);

  return (
    <>
      <input onChange={(e) => setLength(Number(e.target.value))} placeholder="Length" />
      <input onChange={(e) => setWidth(Number(e.target.value))} placeholder="Width" />
      <div>Rectangle Area: {area}</div>
    </>
  );
};

export default memo(HandleRec);
