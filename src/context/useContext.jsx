import React, { createContext, useState } from "react";

export const ThemeContextAPI = createContext();

export const ProviderAPI = ({ children }) => {
  const [formdata, setFormdata] = useState({
    controls: {
      name: "",
      email: "",
      password: "",
      cardName: "",
      category: {},
      Cardamount: "",
      image: "",
      country: {},
      status: '',
      remarks: '',
      fund: '',
      user: '',
      amount: '',
      images: [],
      blob: []

    },
  });

  return (
    <ThemeContextAPI.Provider
      value={{
        formdata,
        setFormdata,
      }}
    >
      {children}
    </ThemeContextAPI.Provider>
  );
};
