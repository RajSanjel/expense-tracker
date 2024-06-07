import config from "@/config";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

type DbProviderProps = {
  children: ReactNode;
};

type incExpDataProps = {
  uid: string,
  id: string,
  date: string;
  income: number;
  expense: number;
  title: string
};

type userDataContext = {
  incExpData: incExpDataProps[];
  isLoading: boolean;
  error: string | null;
};

const DbContext = createContext({} as userDataContext);

export function useDb() {
  const context = useContext(DbContext);
  if (context === undefined)
    throw new Error("useDb must be used within a DbProvider");

  return context;
}

const fetchIncExpData = async () => {
  const response = await axios.get(`${config.API_BASE_URL}/api/get/dash`, {
    headers: {
      Authorization: localStorage.getItem("token") || ""
    }
  });
  return response.data;
}

export function DbProvider({ children }: DbProviderProps) {
  const [incExpData, setIncExpData] = useState<incExpDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getData = async () => {
    try {
      const data = await fetchIncExpData();
      setIncExpData(data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [])
  return (
    <DbContext.Provider value={{ incExpData, isLoading, error }}>
      {children}
    </DbContext.Provider>
  );
}