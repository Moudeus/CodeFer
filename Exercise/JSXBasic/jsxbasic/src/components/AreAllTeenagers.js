import { memo } from "react";

function AreAllTeenager({ people }) {
  return (
    <p>
      Every people is Teenager:{" "}
      <span style={{ color: "red" }}>
        {" "}
        {people.find((pp) => pp.age < 10 || pp.age > 20) === "undefined" ? "True" : "False"}{" "}
      </span>
    </p>
  );
}
export default memo(AreAllTeenager);
