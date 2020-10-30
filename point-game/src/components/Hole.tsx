import React, { useState, useEffect } from "react";
import FinishRound from "./FinishRound";
import PlayerList from "./PlayerList";

// Point-game projektissa on niin huonoa ja nopeesti väännettyä koodia,
// että ethän tuomitse. Arvioi jotain muuta projektia. Kiitos!

function Hole(props: any) {
    const [holeNumber, setHoleNumber] = useState(1);
    const [isHoleChanged, setIsHoleChanged] = useState(false);
    const [isFinishClicked, setIsFinishClicked] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const changeIsHoleChangeValueFromChild = (value: boolean) => {
        setIsHoleChanged(value);
    };

    useEffect(() => {
        setIsFinishClicked(false);
    });

    const navigateHole = (id: string) => {
        let newNumber = holeNumber;
        if (id == "previous") {
            if (holeNumber > 1 && !isGameFinished) newNumber--;
            setHoleNumber(newNumber);

            if (holeNumber === props.maxHoles)
                setIsGameFinished(false);
        } else if (id == "next") {
            if (holeNumber < props.maxHoles) newNumber++;

            if (holeNumber === props.maxHoles) {
                setIsGameFinished(true);
                setIsFinishClicked(true);
            }

            setHoleNumber(newNumber);
        }

        setIsHoleChanged(true);
    };

    const RestartButtonClicked = () => {
        setHoleNumber(1);
        setIsHoleChanged(true);
        setIsGameFinished(false);
        props.changeGameState(false)
    }

    const renderHole = () => {
        if (props.startGame) {
            if (!isGameFinished) {
                return (
                    <React.Fragment>
                        <h1>Hole {holeNumber}</h1>
                    </React.Fragment>
                );
            }
            else return (
                <React.Fragment><FinishRound /></React.Fragment>
            )
        }
    };

    return (
        <div className="hole">
            {renderHole()}

            {props.startGame ? <div className="hole-navigation">
                {holeNumber > 1 ? <button
                    id="previous"
                    className="previous"
                    onClick={(e: any) => navigateHole(e.target.id)}
                >
                    {!isGameFinished ? "Previous" : "Back"}
                </button> : null}
                {!isGameFinished ? <button
                    id="next"
                    className="next"
                    onClick={(e: any) => navigateHole(e.target.id)}
                >
                    {holeNumber === props.maxHoles ? "Finish" : "Next"}
                </button> : null}
            </div> : null}

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
                isGameFinished={isGameFinished}
                isFinishClicked={isFinishClicked}
                coursePar={props.coursePar}
            />


            <button
                className="restart-button"
                onClick={() => RestartButtonClicked()}
            >
                Restart
            </button>
        </div>
    );
}

export default Hole;
