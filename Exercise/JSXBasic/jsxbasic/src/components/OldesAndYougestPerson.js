import { memo } from "react";

const OldesAndYougestPerson = ({ people }) => {
  const minAge = people.reduce((prev, curr) => (prev.age < curr.age ? prev : curr));
  const maxAge = people.reduce((prev, curr) => (prev.age < curr.age ? curr : prev));
  return (
    <>
      <p>The Oldest is : {maxAge.age}</p>
      <p>The Yougest is : {minAge.age}</p>
    </>
  );
};

export default memo(OldesAndYougestPerson);
