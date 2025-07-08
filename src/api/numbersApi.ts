type NumberFactType = "math" | "trivia" | "year" | "date";

interface FetchNumberFactParams {
  numbers: string; // максимум 4 цифры, пустая строка если random = true
  type: NumberFactType;
  random: boolean;
}

let cachedFact: string | null = null;

export const fetchNumberFact = async ({
  numbers,
  type,
  random,
}: FetchNumberFactParams): Promise<string | null> => {
  let url = "";

  if (random) {
    url = `http://numbersapi.com/random/${type}`;
  } else {
    if (type === "date") {
      if (numbers.length !== 4) {
        throw new Error("Для типа date требуется 4 цифры: ММДД");
      }
      const month = numbers.slice(0, 2);
      const day = numbers.slice(2, 4);
      url = `http://numbersapi.com/${month}/${day}/date`;
    } else {
      if (!numbers) throw new Error("Число обязательно для данного типа");
      url = `http://numbersapi.com/${numbers}/${type}`;
    }
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Ошибка запроса к Numbers API");
  }

  const data = await res.text(); // <- вместо res.json()

  cachedFact = data; // data уже строка

  return cachedFact;
};

export const getCachedFact = () => cachedFact;
