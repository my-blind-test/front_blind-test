import React from "react"
import api from "./api"

const CurrentUserContext = React.createContext()

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null)

  const fetchCurrentUser = async () => {
    const response = await api.get("/users/me").catch((err) => {
      console.log(err)
    })

    setCurrentUser(response)
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => React.useContext(CurrentUserContext)