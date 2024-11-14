import React, { useEffect, useState } from "react";
import { Missile } from "../interface/missile";

interface Props {
  children: React.ReactNode;
}

interface MissileProps {
  missiles: Missile[];
  setMissiles: React.Dispatch<React.SetStateAction<Missile[]>>;
}
export const storeContext = React.createContext<MissileProps>({
  missiles: [],
  setMissiles: () => {},
});

export default function StoreProvider({ children }: Props) {
  const [missiles, setMissiles] = useState<Missile[]>([]);
  useEffect(() => {
    fetch("")
      .then((response) => response.json())
      .then((data) => {
        setMissiles(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(missiles);
  

  return (
    <>
      <storeContext.Provider value={{ missiles, setMissiles }}>
        {children}
      </storeContext.Provider>
    </>
  );
}
