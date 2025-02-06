import "./App.css";
import NamePerson from "./components/NamePerson";
import PeopleList from "./components/PeopleList";
import TablePeople from "./components/TablePeople";
import FirstTeenager from "./components/FirstTeenager";
import AllTeenagers from "./components/AreAllTeenager";
import SortOccupationAndAge from "./components/SortOccupationAndAge";
import GroupOccupation from "./components/GroupOccupation";
import OldesAndYougestPerson from "./components/OldesAndYougestPerson";

function App() {
  const person = [
    { name: "Alice", age: 20, occupation: "Engineer" },
    { name: "Bob", age: 25, occupation: "Doctor" },
    { name: "Charlie", age: 30, occupation: "Designer" },
    { name: "David", age: 35, occupation: "Artist" },
  ];
  return (
    <>
      <h1>Hello World</h1>
      <NamePerson />
      <p>-----------------------------------</p>
      <h1>Person List</h1>
      <PeopleList people={person} />
      <p>-----------------------------------</p>
      <h1>Table of people</h1>
      <TablePeople people={person} />
      <p>-----------------------------------</p>
      <h1>Find the first teenager </h1>
      <FirstTeenager people={person} />
      <p>-----------------------------------</p>
      <h1> Check if all are teenagers </h1>
      <AllTeenagers people={person} />
      <p>---------------------EX7----------------------</p>
      <SortOccupationAndAge people={people} />
      <p>---------------------EX8----------------------</p>
      <GroupOccupation people={people} />
      <p>---------------------EX9----------------------</p>
      <OldesAndYougestPerson people={people} />
    </>
  );
}

export default App;
