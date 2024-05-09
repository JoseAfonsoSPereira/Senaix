import AsyncStorage from "@react-native-community/async-storage";
import {createContext, useState, useEffect, useCallback} from "react";
import { api } from "../services/api";

const AuthContext = createContext({});

export const AuthProvider =() => ({children}) =>{
    const[data, setData] = useState();

    useEffect(() => {
        async function loadStorageData(){
            const[token, user] = await AsyncStorage.multiGet([
                "@senaiX:token",
                "@senaiX:user",
            ]);
            if(token[1] && user[1]){
                api.defaults.headers.authorizate = `Bearer ${token[1]}`;
                setData({
                    token: token[1],
                    user: JSON.parse(user[1]),
                });
        }
      }
      loadStorageData()
      const signIn = useCallback(async({email, passaword}) => {
        const response = api.post("login", {email, passaword});
        const {toker, user} = response.data;
        await AsyncStorage.multiSet([
            ["@senaiX:token", token],
            ["@senaiX:user", JASON.stringify(user)],
        ]);
      }, [] );
      const sigOut = useCallback(async() => {
        await AsyncStorage.multiRemove([
            "@senaiX:token",
            "@senaiX:user",
        ]);
        setData({});
      }, [] ); 

      return (
              <AuthContext.Provider value={{...data, signIn, sigOut}}>
                  {children}
              </AuthContext.Provider>
            );
    });
};

export const useAuth =  () => useContext(AuthContext);