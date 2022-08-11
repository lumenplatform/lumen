import { ContainerClient } from '@azure/storage-blob';
import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getUploadConfig } from '../api';

interface StorageContextType {
  containerClient?: ContainerClient | null;
}

export const StorageContext = createContext<StorageContextType>(null!);
/**
 * TODO: Mode upload logic to provider
 *
 *
 */
export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [containerClient, setContainerClient] = useState<ContainerClient>(
    null!
  );
  const { data: uploadConfig } = useQuery(
    'fetchUploadConfig',
    getUploadConfig,
    { staleTime: 1000 * 60 * 10 }
  );

  useEffect(() => {
    if (uploadConfig) {
      const client = new ContainerClient(uploadConfig.sas);
      setContainerClient(client);
    }
  }, [uploadConfig]);

  return (
    <StorageContext.Provider value={{ containerClient }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  return useContext(StorageContext);
}
