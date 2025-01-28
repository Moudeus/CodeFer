import { memo } from "react";

const SortOccupationAndAge = ({ people }) => {
  people.sort((a, b) => {
    if (a.occupation < b.occupation) return -1;
    if (a.occupation > b.occupation) return 1;

    return a.age - b.age;
  });
  console.log("hello");
  return (
    <ul>
      {people.map((person, index) => (
        <li key={index}>
          {" "}
          <span style={{ color: "orange" }}>Name : {person.name}</span> ,
          <span style={{ color: "cyan" }}> Age : {person.age} </span>, Occupation : {person.occupation}
        </li>
      ))}
    </ul>
  );
};

export default memo(SortOccupationAndAge);
