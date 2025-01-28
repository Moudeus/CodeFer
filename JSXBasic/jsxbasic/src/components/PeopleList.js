import React from "react";
function PeopleList({ people }) {
  return (
    <div>
      {people.map((person) => (
        <div key={person.id}>
          {person.name}, {person.age}, {person.occupation}
        </div>
      ))}
    </div>
  );
}
export default PeopleList;
