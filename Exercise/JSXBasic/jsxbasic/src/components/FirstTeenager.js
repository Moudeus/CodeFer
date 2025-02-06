import { memo } from "react";

function FirstTeenager({ people }) {
  return <p> First people is teenager : {people.find((pp) => pp.age >= 10 && pp.age <= 20).name}</p>;
}
export default memo(FirstTeenager);
