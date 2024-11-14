import { useContext, useEffect, useState } from "react";
import { storeContext } from "../providers/StoreProvider";
import { Missile } from "../interface/missile";
import { useParams } from "react-router-dom";
import { OrgnizationsContext } from "../providers/OrganizationsProvider";
import { Organizations } from "../interface/organiztion";

// interface OrgProps {
//   org: Organizations
// }

export default function Store() {
  const { missiles } = useContext(storeContext);
  const { organizations } = useContext(OrgnizationsContext);
  const [miss, setMissiles] = useState<Missile[]>([]);
  
  const [cart, setCart] = useState<Missile[]>([])
  
  const { name } = useParams();

  const [org, setOrg] = useState<Organizations[]>([]);
  useEffect(() => {
    fetch("http://localhost:7707/organization")
      .then((response) => response.json())
      .then((data) => setOrg(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:7707/store/:name", {
      credentials: "include",
    })
    .then((response) => response.json())
    .then((data) => setMissiles(data))
      .catch((error) => console.error("Error fetching data:", error));
    }, []);
    
  //   function sunOfSelectedItems (cart: Missile[]): number {
  //     let sum = 0;
  //     cart.map((c) => {
  //     sum += c.price
  //   })
  //   return sum
  // }

  function findTheOrg(orgName: string): Organizations | undefined {
    const correctOrg = org.find((org) => org.name === orgName)
    return correctOrg
  }

  async function buyItems(item: Missile) {
    const currentOrg = findTheOrg(name!);
    
    const specificResourse = currentOrg?.resources.find((r) => r.name === item.name);

    if (specificResourse) {
      specificResourse.amount +=1
    }

    try {
      const response = await fetch("http://localhost:7707/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // חשוב בשביל קבלת הקוקיז
        body: JSON.stringify({ currentOrg }),
      });
    } catch {
      console.error("tttt");
      
    }
  }

  

  return (
    <div>
      <div>
        {cart.map((itemInCart) =>
          <p>{itemInCart.name} price: {itemInCart.price}</p>
        )}
        {/* <h3>Sum Of All Cart: {sunOfSelectedItems(cart)}</h3> */}
      </div>

      <div>
      {miss.map((item) => (
        <div className="item-in-store">
          <h4>{item.name}</h4>
          <p>{item.description}</p>
          <p>{item.speed}</p>
          <p>{item.intercepts}</p>
          <h4>{item.price}</h4>
          <button onClick={() => buyItems(item)}>Buy</button>
        </div>
      ))}
    </div>
    </div>
  );
}
