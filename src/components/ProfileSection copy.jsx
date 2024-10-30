import React from "react";
import star from "../images/story_stars_1.png";
import { useState } from "react";

const ProfileSection = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  // update when profile page available.
  // function LoginForm() {
  // }

  const handleSignIn = () => {
    if (username.trim() === "" || password.trim() === "") {
      setFormError("Please enter both username and password.");
      return;
    }

    console.log("Username: ", username);
    console.log("Password: ", password);
  };

  return (
    <div
      className="main-bg just-another-hand text-4xl"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <header>
          <div className="container mx-auto px-4">
            <div className="flex flex-center justify-center">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={star} alt="" className="w-16 h-16 mb-4"></img>
                <h1
                  className="header-font header-format"
                  style={{ fontSize: "2em", padding: "25px" }}
                >
                  LOGIN{" "}
                </h1>
                <img src={star} alt="" className="w-16 h-16 mb-4"></img>

                <br></br>
              </div>
            </div>
          </div>
          <div id="input section">
            <form onSubmit={handleSignIn}>
              <label>email or username</label>
              <br></br>
              <input
                type="text"
                id="username"
                className="input-borders"
                style={{ width: "300px" }}
                value={username}
                onChange={e => setUsername(e.target.value)}
              ></input>
              <br></br>
              <br></br>
              <label>password</label>
              <br></br>
              <input
                type="password"
                id="password"
                className="input-borders"
                style={{ width: "300px" }}
                value={password}
                onChange={e => setPassword(e.target.value)}
              ></input>

              <br></br>
              <u>
                <a href="/accountrecovery" style={{ fontSize: "30px" }}>
                  Forgot password?{" "}
                </a>
              </u>

              {formError && (
                <div style={{ color: "red", marginTop: "10px" }}>
                  {formError}
                </div>
              )}

              <br></br>
              <br></br>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <button
                  className="bg-[#780000] hover:bg-[#780000] text-white py-2 px-8 rounded-full mt-4"
                  type="submit"
                  onClick={handleSignIn}
                >
                  sign in
                </button>
                <br></br>
                <u>
                  <a href="/createaccount">create account</a>
                </u>
              </div>
            </form>
          </div>
        </header>
      </div>
    </div>
  );
};

export default ProfileSection;
