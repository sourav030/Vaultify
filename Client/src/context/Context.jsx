import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Context create karna
export const BankContext = createContext();

// Provider Component
const Context = ({ children }) => {
  const [balance, setBalance] = useState();
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [accoutId,setAccountId]=useState();
  

  // ✅ Banks state for storing API data
  const [banks, setBanks] = useState([]);

  // ✅ API call to fetch banks
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/bank/api/v1/getAllBank");

        // API ka data object hai -> isko array banate hain
        
        
        setBanks(res.data.data);
       
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, [banks]);


  return (
    <BankContext.Provider
      value={{ balance, setBalance, login, setLogin, token, setToken, banks ,accoutId,setAccountId}}
    >
      {children}
    </BankContext.Provider>
  );
};

export default Context;
