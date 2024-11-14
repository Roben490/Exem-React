import React, { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Organizations } from "../interface/organiztion";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [place, setPlace] = useState("");
  const [organization, setOrganization] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [org, setOrg] = useState<Organizations[]>([]);
  useEffect(() => {
    fetch("http://localhost:7707/organization")
      .then((response) => response.json())
      .then((data) => setOrg(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim() || !organization.trim()) {
      setError("Not fulling");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:7707/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // חשוב בשביל קבלת הקוקיז
        body: JSON.stringify({ username, password, organization, place }),
      });

      if (response) {
        navigate("/login");
      } else {
        setError("Place full al spaces.");
        setPassword("");
      }
    } catch (err) {
      setError("Register failed, Please try again!");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              id="username"
              type="text"
              placeholder="Enter User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              dir="ltr"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              dir="ltr"
            />
          </div>

          <select
            onChange={(o) => setOrganization(o.target.value)}
            id="organization-select"          >
            {org.map((o) => (
              <option value={o.name}>{o.name}</option>
            ))}
          </select>

          <div className="form-group">
            <label htmlFor="place">Place</label>
            <input
              id="place"
              type="text"
              placeholder="Enter Place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              disabled={isLoading}
              dir="ltr"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className={`register-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Registering...</span>
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// import React, { useEffect, useState } from "react";
// import { User } from "../interface/User";

// const addUser = (newUser: User) => {
//   ;
// };

// export default function RegisterPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [organization, setOrganization] = useState("");
//   const [place, setPlace] = useState("");

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     addUser({
//       username,
//       password,
//       organization,
//       place,
//     });
//     setUsername("");
//     setPassword("");
//     setOrganization("");
//     setPlace("");
//   };
//   return (
//     <>
//       <div className="form-container">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="userName">User Name</label>
//             <input
//               id="userName"
//               type="text"
//               value={username}
//               placeholder="Enter your User Name"
//               required
//               onChange={(event) => {
//                 setUsername(event.target.value);
//               }}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               placeholder="Enter your Password"
//               required
//               onChange={(event) => {
//                 setPassword(event.target.value);
//               }}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="organization">Organization</label>
//             <input
//               id="organization"
//               type="text"
//               value={organization}
//               placeholder="Enter your organization"
//               required
//               onChange={(event) => {
//                 setOrganization(event.target.value);
//               }}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="place">Place</label>
//             <input
//               id="place"
//               type="text"
//               value={place}
//               placeholder="0"
//               onChange={(event) => {
//                 setPlace(event.target.value);
//               }}
//             />
//           </div>

//           <button type="submit">Add New User</button>
//         </form>
//       </div>
//     </>
//   );
// }
