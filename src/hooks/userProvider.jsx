import React, { createContext, useState } from "react";

const UserContext = createContext(null);
const UserProvider = ({ children }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone_no, setPhone_no] = useState();
  const [address, setAddress] = useState();
  const [id, setId] = useState();
  const [orgs, setOrgs] = useState([]);

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        phone_no,
        setPhone_no,
        address,
        setAddress,
        id,
        setId,
        orgs,
        setOrgs
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export default UserProvider;
