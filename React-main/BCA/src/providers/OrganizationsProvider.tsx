import React, { useEffect, useState } from "react";
import { Organizations } from '../interface/organiztion';


interface Props {
  children: React.ReactNode;
}

interface UserProps {
  organizations: Organizations[];
  setOrgnizations: React.Dispatch<React.SetStateAction<Organizations[]>>;
}

export const OrgnizationsContext = React.createContext<UserProps>({
  organizations: [],
  setOrgnizations: () => {},
});

export default function OrganizationsProvider({ children }: Props) {
  const [organizations, setOrgnizations] = useState<Organizations[]>([]);
  useEffect(() => {
    fetch("")
      .then((response) => response.json())
      .then((data) => {
        setOrgnizations(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <OrgnizationsContext.Provider value={{ organizations, setOrgnizations }}>
      {children}
    </OrgnizationsContext.Provider>
  );
}
