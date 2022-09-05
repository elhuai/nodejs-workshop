// 靠著全站共享這個檔案
// 來做會員是否登入的控制
import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
