import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';

type ErrorState = [string, Dispatch<SetStateAction<string>>];

const ErrorContext = createContext<ErrorState>(undefined as never);

export const ErrorProvider: FC = ({ children }) => {
  const errorState = useState('');

  return <ErrorContext.Provider value={errorState}>{children}</ErrorContext.Provider>;
};

const useError = () => useContext(ErrorContext);

export default useError;
