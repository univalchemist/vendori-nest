import { Connection } from 'jsforce';
export type ConnectType = {
  usernameSF: string;
  passwordSF: string;
  clientIdSF: string;
  clientSecretSF: string;
  companyId: number;
};

export type TConnectionPool = {
  companyId: number;
  connection: Connection;
};
