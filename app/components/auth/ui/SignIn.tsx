"use client";
import React, { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import { TypeAnimation } from "react-type-animation";
import { useSpring, animated } from "@react-spring/web";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameEntered, setIsUsernameEntered] = useState(false);
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const DBUsername = "admin";
  const DBPassword = "password";

  const usernameAnimation = useSpring({
    opacity: isUsernameEntered ? 0.5 : 1,
    transform: `translateY(${isUsernameEntered ? "-10px" : "0"})`,
    config: { tension: 300, friction: 20 },
  });

  const passwordAnimation = useSpring({
    opacity: isUsernameEntered ? (isPasswordEntered ? 0.5 : 1) : 0.5,
    transform: `translateY(${isUsernameEntered ? "0" : "10px"})`,
    config: { tension: 300, friction: 20 },
  });

  const handleUsernameKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsUsernameEntered(true);
      passwordRef.current?.focus();
    }
  };

  const handlePasswordKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      document.getElementsByTagName("input")[1].blur();
      setIsPasswordEntered(true);
      setIsAuthenticated(username === DBUsername && password === DBPassword);
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  return (
    <div className="terminal">
      <div className="container">
        <div className="signinform">
          <animated.div style={usernameAnimation} className="field">
            <span className="prompt">
              (login) ➜{" "}
              <TypeAnimation
                sequence={["username ~", Infinity]}
                wrapper="span"
                speed={25}
                repeat={0}
                cursor={false}
                style={{ display: "inline-block" }}
              />
            </span>
            <input
              type="text"
              value={username}
              onChange={handleInputChange(setUsername)}
              onKeyPress={handleUsernameKeyPress}
              className="input"
              autoFocus={!isUsernameEntered}
              autoComplete="off"
              autoCorrect="off"
              ref={usernameRef}
            />
          </animated.div>
          <animated.div style={passwordAnimation} className="field">
            {isUsernameEntered && (
              <>
                <span className="prompt">
                  (login) ➜{" "}
                  <TypeAnimation
                    sequence={["password ~", Infinity]}
                    wrapper="span"
                    speed={10}
                    repeat={0}
                    cursor={false}
                    style={{ display: "inline-block" }}
                  />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={handleInputChange(setPassword)}
                  onKeyPress={handlePasswordKeyPress}
                  className="input"
                  ref={passwordRef}
                  autoFocus={isUsernameEntered && !isPasswordEntered}
                  style={{opacity:0}}
                />
              </>
            )}
          </animated.div>
          <animated.div style={{ opacity: 1, margin: 0 }} className="field">
            {isAuthenticated !== null && isPasswordEntered && (
              <div className="message">
                <span className="prompt">
                  (login) ➜{" "}
                  <TypeAnimation
                    sequence={[
                      "Authenticating",
                      () => {
                        return new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                      },
                      "Authenticating .",
                      () => {
                        return new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                      },
                      "Authenticating . .",
                      () => {
                        return new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                      },
                      "Authenticating . . .",
                      () => {
                        return new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                      },
                      isAuthenticated
                        ? "Authentication success"
                        : "Authentication failed",
                      Infinity,
                    ]}
                    wrapper="span"
                    speed={50}
                    cursor={false}
                    style={{ display: "inline-block" }}
                  />
                </span>
              </div>
            )}
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
