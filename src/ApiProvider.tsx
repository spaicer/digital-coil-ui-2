import React, { createContext, useContext, useMemo } from 'react'

import { Configuration, DefaultApi } from './client'

export type ApiT = {
  defaultApi: DefaultApi
}

export const ApiContext = createContext<ApiT>({
  defaultApi: new DefaultApi(),
})

export const ApiProvider: React.FC<{ configuration: Configuration }> = ({
  configuration,
  children,
}) => {
  const api = useMemo(() => {
    return {
      defaultApi: new DefaultApi(configuration),
    }
  }, [configuration])
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

export const useApi = (): [ApiT] => {
  const api = useContext(ApiContext)
  return [api]
}
