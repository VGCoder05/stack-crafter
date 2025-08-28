import { createContext } from "react";
import { useState } from "react";


export const CardContext = createContext(null);

const Context = (props) => {

const [data, setdata] = useState(""); // pass insitial data in desired format


  return (
    <CardContext.Provider value={{ data, setdata }}>
      {props.children}
    </CardContext.Provider>
  );
};

export default Context;