export const animals = [
  {
    name: "Lion",
    scientificName: "Panthero leo",
    size: 140,
    diet: ["meat"],
    image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg",
  },
  {
    name: "Gorilla",
    scientificName: "Gorilla beringei",
    size: 205,
    diet: ["plants", "insects"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/78/Mountain_gorilla_%28Gorilla_beringei_beringei%29_yawn.jpg",
    additional: {
      notes: "This is the eastern gorilla. There is also a western gorilla that is a different species.",
    },
  },
  {
    name: "Zebra",
    scientificName: "Equus quagga",
    size: 322,
    diet: ["plants"],
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Plains_Zebra_Equus_quagga.jpg",
    additional: {
      notes: "There are three different species of zebra.",
      link: "https://en.wikipedia.org/wiki/Zebra",
    },
  },
];

export default animals;
