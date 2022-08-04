import { createContext, useContext, useEffect, useState } from 'react';
import api from "../utils/api"
import { ConnectedUser, UserStatus } from '../utils/interfaces/ConnectedUser';
interface ICurrentUserContext {
  currentUser?: ConnectedUser;
  fetchCurrentUser?: () => Promise<void>;
};

const CurrentUserContext = createContext<ICurrentUserContext>({});

export function CurrentUserWrapper({ children }: any) {
  const [currentUser, setCurrentUser] = useState<ConnectedUser>()

  const fetchCurrentUser = async () => {
    const response = await api.get("/users/me").catch((err) => {
      console.log(err)

      return undefined
    })

    setCurrentUser(response)

  }

  useEffect(() => {
    fetchCurrentUser()
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export const useCurrentUserContext = () => useContext(CurrentUserContext)
