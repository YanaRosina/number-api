import { useState, useCallback } from "react";
import { fetchNumberFact } from "../api/numbersApi";

export type NumberFactType = "math" | "trivia" | "year" | "date";

export interface FactData {
  fact: string;
  numbers: string;
  type: NumberFactType;
  random: boolean;
}

interface UseNumberFactReturn {
  factData: FactData | null;
  error: string | null;
  loading: boolean;
  fetchFact: (
    numbers: string,
    type: NumberFactType,
    random: boolean
  ) => Promise<void>;
  clearFact: () => void;
}

export const useNumberFact = (): UseNumberFactReturn => {
  const [factData, setFactData] = useState<FactData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFact = useCallback(
    async (numbers: string, type: NumberFactType, random: boolean) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchNumberFact({ numbers, type, random });

        if (result) {
          setFactData({
            fact: result,
            numbers,
            type,
            random,
          });
        } else {
          setError("Факт не найден");
          setFactData(null);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Неизвестная ошибка";
        setError(errorMessage);
        setFactData(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearFact = useCallback(() => {
    setFactData(null);
    setError(null);
  }, []);

  return {
    factData,
    error,
    loading,
    fetchFact,
    clearFact,
  };
};
