import React, { useState, useEffect } from "react";
import PlayerList from "./PlayerList";

function Hole(props: any) {
    const [holeNumber, setHoleNumber] = useState(1);
    const [resetHolePoints, setResetHolePoints] = useState(false);

    const changeResetHolePointsValueFromChild = (value: boolean) => {
        setResetHolePoints(value);
    };

    const navigateHole = (id: string) => {
        let newNumber = holeNumber;
        if (id == "previous") {
            if (holeNumber > 1) newNumber--;
            setHoleNumber(newNumber);
        } else if (id == "next") {
            if (holeNumber < props.maxHoles) newNumber++;
            setHoleNumber(newNumber);
        }

        setResetHolePoints(true);
    };

    const renderHole = () => {
        if (props.startGame) {
            return (
                <React.Fragment>
                    <h1>Hole {holeNumber}</h1>
                    <div className="hole-navigation">
                        <button
                            id="previous"
                            className="previous"
                            onClick={(e: any) => navigateHole(e.target.id)}
                        >
                            Previous
                        </button>
                        <button
                            id="next"
                            className="next"
                            onClick={(e: any) => navigateHole(e.target.id)}
                        >
                            Next
                        </button>
                    </div>
                    <button
                        className="home-button"
                        onClick={() => props.changeGameState(false)}
                    >
                        Home
                    </button>
                </React.Fragment>
            );
        }
    };

    return (
        <div className="hole">
            {renderHole()}

            <PlayerList
                maxHoles={props.maxHoles}
                changeMaxHoles={props.changeMaxHoles}
                startGame={props.startGame}
                changeGameState={props.changeGameState}
                holeNumber={holeNumber}
                resetHolePoints={resetHolePoints}
                changeResetHolePointsValueFromChild={
                    changeResetHolePointsValueFromChild
                }
            />
        </div>
    );
}

export default Hole;
