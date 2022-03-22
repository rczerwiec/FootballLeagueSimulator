import React, {useState} from 'react';
import styles from './Navbar.module.css';
import NavbarObject from './NavbarObject/NavbarObject';

const Navbar = props =>{

    const [showNav,setShowNav] = useState({
        style:styles.side_navbar,
        showed: true,
        text: 'Schowaj'
    });

    const showNavHandler = () => {
        if(showNav.showed){
            setShowNav({
                style:styles.side_navbar_closed,
                showed: false,
                text: 'Pokaż',
            });
        }
        else{
            setShowNav({
                style:styles.side_navbar,
                showed: true,
                text: 'Schowaj',
            });
        }
        
    }
    
    return(
    <div className={showNav.style}>
        {showNav.showed &&
        <div>
            <NavbarObject routeDestination='#section' name="Kluby"/>
            <NavbarObject routeDestination='#section' name="Zawodnicy"/>
            <NavbarObject routeDestination='#section' name="Ligi"/>
            <NavbarObject routeDestination='#section' name="Ustawienia"/>
        </div>
        }
        <div><button className={styles.button} onClick={showNavHandler}>{showNav.text}</button></div>
    </div>);
}


export default Navbar;