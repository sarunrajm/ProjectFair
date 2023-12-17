import React, { createContext,useState } from 'react'
export const TokenAuthorisationContext = createContext()

function TokenAuth({children}) {
    const [isAuthorized,setIsAuthorized] = useState(false)
  return (
    <>
    <TokenAuthorisationContext.Provider value={{isAuthorized,setIsAuthorized}}>
        {children}
        </TokenAuthorisationContext.Provider>
    </>
  )
}

export default TokenAuth