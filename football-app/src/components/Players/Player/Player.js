import React from 'react';

const Player = (props) => {


    return(
        <div>
            {props.name}, {props.nationality}
        </div>
    );
}

export default Player;