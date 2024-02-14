import React from "react";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/Authcontext.js";
import { useBasket } from "../../contexts/Basketcontext.js";

function Navbar() {
  const { loggedIn, user } = useAuth();
  const { items } = useBasket();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <NavLink to="/">eCommerce</NavLink>
        </div>

        <ul className={styles.menu}>
          <li>
            <NavLink to="/">Products</NavLink>
          </li>
        </ul>
      </div>

      <div className={styles.right}>
        {!loggedIn && (
          <>
            <NavLink to="signup">
              <Button colorScheme="pink">Register</Button>
            </NavLink>
            <NavLink to="signin">
              <Button colorScheme="pink">Login</Button>
            </NavLink>
          </>
        )}

        {loggedIn && (
          <>
            {items.length > 0 && (
              <NavLink to="basket">
                <Button colorScheme="pink" variant="outline">
                  Basket ({items.length})
                </Button>
              </NavLink>
            )}

            {user?.role === "admin" && (
              <NavLink to="admin">
                <Button colorScheme="pink" variant="ghost">
                  Admin
                </Button>
              </NavLink>
            )}

            <NavLink to="profile">
              <Button>Profile</Button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
