import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { OrgnizationsContext } from "../providers/OrganizationsProvider";
import { Organizations } from "../interface/organiztion";
import { UserContext } from "../providers/UserProvider";
import { storeContext } from "../providers/StoreProvider";


const HomePage = () => {
  
  const authContext = useContext(UserContext);
  const OrgContext = useContext(OrgnizationsContext);
  const cart = useContext(storeContext);
  const NameOfOrg = authContext?.user?.organization;

  function findTheOrg(orgName: string): Organizations | undefined {
    const correctOrg = OrgContext.organizations.find((org) => org.name === orgName)
    return correctOrg
  }


  const correctOrg = findTheOrg(NameOfOrg!)


  return (
    <div>
      {authContext?.user ? (
        <>
          <h1>Welcome, {authContext.user.username + "From - " + authContext.user.organization + " " + authContext.user.place}!</h1>
          <button>
            <NavLink to={"/store"}>Store</NavLink>
          </button>
          <div>
            <h3>Army Storage</h3>
            <ul>
              {correctOrg?.resources.map((r) =>
                <li>{r.name} + {"  -->  "} + {r.amount} </li>
              )}
            </ul>
          </div>
          <div>
            <h4>Cart</h4>
            <h5>{cart.missiles.map((m) => 
              <p>{m.name} + {" - "} + {m.price}</p>
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
