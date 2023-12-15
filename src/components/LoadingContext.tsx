import { PropsWithChildren, createContext, useContext, useState } from "react";

export type LoadingContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider(props: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const value = { loading, setLoading };
  return (
    <LoadingContext.Provider value={value}>{props.children}</LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}