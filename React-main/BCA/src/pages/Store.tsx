import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../providers/StoreProvider";
import { Missile } from "../interface/missile";
import { useParams } from "react-router-dom";
import { OrgnizationsContext } from "../providers/OrganizationsProvider";

export default function Store() {
  const { missiles } = useContext(storeContext);
  const { organizations } = useContext(OrgnizationsContext);
  const [miss, setMissiles] = useState<Missile[]>([]);
  
  const [cart, setCart] = useState<Missile[]>([])

  useEffect(() => {
    fetch("http://localhost:7707/store", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setMissiles(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function sunOfSelectedItems (cart: Missile[]): number {
    let sum = 0;
    cart.map((c) => {
      sum += c.price
    })
    return sum
  }

  function buyItems(): void {
    
    const { orgname } = useParams();
    console.log(orgname);
    
    // const currentOrg = findTheOrg(orgname!);
  }

  buyItems()

  return (
    <div>
      <div>
        {cart.map((itemInCart) =>
          <p>{itemInCart.name} price: {itemInCart.price}</p>
        )}
        <h3>Sum Of All Cart: {sunOfSelectedItems(cart)}</h3>
      <button>Buy</button>
      </div>

      <div>
      {miss.map((item) => (
        <div className="item-in-store">
          <h4>{item.name}</h4>
          <p>{item.description}</p>
          <p>{item.speed}</p>
          <p>{item.intercepts}</p>
          <h4>{item.price}</h4>
          <button onClick={() => setCart([...cart ,item])}>Add To Cart</button>
        </div>
      ))}
    </div>

    </div>
    

  );
}
