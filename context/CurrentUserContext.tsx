import { createContext, useContext, useEffect, useState } from 'react';
import api from "../utils/api"
import { ConnectedUser, UserStatus } from '../utils/interfaces/ConnectedUser';

const fakeUser: ConnectedUser = {
  name: "Loading",
  id: "0",
  clientId: "0",
  score: 0,
  status: UserStatus.LOBBY
}
interface ICurrentUserContext {
  currentUser: ConnectedUser;
  fetchCurrentUser?: () => Promise<void>;
};

const CurrentUserContext = createContext<ICurrentUserContext>({ currentUser: fakeUser });

export function CurrentUserWrapper({ children }: any) {
  const [currentUser, setCurrentUser] = useState<ConnectedUser>(fakeUser)

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
