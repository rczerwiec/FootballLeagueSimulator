import React, { useState } from "react";
import styles from "./Navbar.module.css";
import NavbarOption from "./NavbarOptions/NavbarOption";
import {ImUser,ImTable} from "react-icons/im";
import {BiFootball} from "react-icons/bi";
import {FiSettings} from "react-icons/fi";
import {GiPunch} from "react-icons/gi";
import Button from "../ReusableComponents/Button";
import { userSignOut } from "../../firebase/firebase";
import { useGetUserQuery } from "../../store";

const Navbar = (props) => {

  const {data, error, isLoading} = useGetUserQuery();
  const [icons] = useState({
    club: <BiFootball/>,
    players: <ImUser/>,
    match: <GiPunch/>,
    leagues:<ImTable/>,
    settings:<FiSettings/>
  })
  let userInfo
  if(!isLoading && !error){
    userInfo = <div>
      <div>{data.email}</div>
      <div>Ligi:{data.leagues.length}</div>
      <div>Pilkarze:{data.players.length}</div>
      <div>Kluby:{data.clubs.length}</div>
      <div>Sezon:{data.season}</div>
      <form onSubmit={() => {userSignOut()}}>
          <Button>Wyloguj</Button>
        </form>
    </div>
  }

  return (
    <div className={styles.NavbarFlex}>
      <div className={styles.NavbarLogo}><img width="250px" src="https://i.imgur.com/DT87WfU.png" alt=""></img></div>
      <div className={styles.NavbarOptions}>
        <NavbarOption icon={icons.club} destination="/kluby" name = "Kluby"/>
        <NavbarOption icon={icons.players} destination="/zawodnicy" name = "Zawodnicy"/>
        <NavbarOption icon={icons.leagues} destination="/sezony" name = "Sezony"/>
        <NavbarOption icon={icons.leagues} destination="/ligi" name = "Ligi"/>
        <NavbarOption icon={icons.match} destination="/pojedynek" name = "Pojedynczy Mecz"/>
        <NavbarOption icon={icons.settings}  destination="/ustawienia" name = "Ustawienia"/>
        {userInfo}

      </div>
      <div className={styles.NavbarFotter}>© 2022 Radoslaw Czerwiec</div>
    </div>
  );
};

export default Navbar;
