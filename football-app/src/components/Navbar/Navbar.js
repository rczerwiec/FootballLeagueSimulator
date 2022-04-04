import React, { useState } from "react";
import styles from "./Navbar.module.css";
import NavbarOption from "./NavbarOptions/NavbarOption";

const Navbar = (props) => {
  return (
    <div className={styles.NavbarFlex}>
      <div className={styles.NavbarLogo}>LOGO</div>
      <div className={styles.NavbarOptions}>
        <NavbarOption destination="/kluby" name = "Kluby"/>
        <NavbarOption destination="/zawodnicy" name = "Zawodnicy"/>
        <NavbarOption destination="/ligi" name = "Ligi"/>
        <NavbarOption destination="/ustawienia" name = "Ustawienia"/>
      </div>
      <div className={styles.NavbarFotter}>© 2022 Radoslaw Czerwiec</div>
    </div>
  );
};

export default Navbar;
