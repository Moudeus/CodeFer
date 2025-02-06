function NamePerson() {
  const names = ["Alice", "Bob", "Charlie"];
  const element = (
    <ul>
      {names.map((name, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );

  return element;
}

export default NamePerson;
