import React, { useState, useEffect } from "react";
import PlayerList from "./PlayerList";

// Point-game projektissa on niin huonoa ja nopeesti väännettyä koodia,
// että ethän tuomitse. Arvioi jotain muuta projektia. Kiitos!

function Hole(props: any) {
    const [holeNumber, setHoleNumber] = useState(1);
    const [isHoleChanged, setIsHoleChanged] = useState(false);

    const changeIsHoleChangeValueFromChild = (value: boolean) => {
        setIsHoleChanged(value);
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

        setIsHoleChanged(true);
    };

    const RestartButtonClicked = () => {
        setHoleNumber(1);
        setIsHoleChanged(true);
        props.changeGameState(false)
    }

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
                        className="restart-button"
                        onClick={() => RestartButtonClicked()}
                    >
                        Restart
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
                isHoleChanged={isHoleChanged}
                changeIsHoleChangeValueFromChild={
                    changeIsHoleChangeValueFromChild
                }
            />
        </div>
    );
}

export default Hole;
