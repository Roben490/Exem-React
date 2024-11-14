import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { OrgnizationsContext } from "../providers/OrganizationsProvider";
import { Organizations } from "../interface/organiztion";
import { UserContext } from "../providers/UserProvider";
import { storeContext } from "../providers/StoreProvider";



const HomePage = () => {
  
  const authContext = useContext(UserContext);
  const OrgContext = useContext(OrgnizationsContext);
  const cart = useContext(storeContext);
  const NameOfOrg = authContext?.user?.organization;

  const [organizations, setOrgnizations] = useState<Organizations[]>([]);
  useEffect(() => {
    fetch("http://localhost:7707/organization")
      .then((response) => response.json())
      .then((data) => {
        setOrgnizations(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const currentOrg = organizations.find((o) => o.name === authContext?.user?.organization)


  return (
    <div>
      {authContext?.user ? (
        <>
          <h1>Welcome, {authContext.user.username + " From - " + authContext.user.organization}!</h1>
          <h3>Budget:  {currentOrg?.budget}</h3>
          <button>
            <NavLink to={`/store/${authContext.user.organization}`}>Store</NavLink>
          </button>
          <div>
            <h3>Army Storage</h3>
            <ul>
              {currentOrg?.resources.map((r) =>
                <li>{r.name}  {"  -->  "}  {r.amount} </li>
              )}
            </ul>
          </div>
          <div>
            <h4>Cart</h4>
            <h5>{cart.missiles.map((m) => 
              <p>{m.name}  {" - "}  {m.price}</p>
            )}</h5>
          </div>
          <button onClick={authContext.logout}>Logout</button>
        </>
      ) : (
        <>
        <button>
          <NavLink to={"/login"}>Log In</NavLink>
        </button>
        <button>
          <NavLink to={"/register"}>Register</NavLink>
        </button>
        </>
      )}
    </div>
  );
};

export default HomePage;
