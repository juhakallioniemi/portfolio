import React, { useState, useEffect } from "react";
import PlayerList from "./PlayerList";
import Hole from "./Hole";
import TotalPoints from "./TotalPoints";

function Main() {
    const [startGame, setStartGame] = useState(false); // default false
    const [maxHoles, setMaxHoles] = useState(18);

    const changeMaxHoles = (value: number) => {
        setMaxHoles(value);
    };

    const changeGameState = (value: boolean) => {
        setStartGame(value);
    };

    const headerRender = () => {
        if (!startGame) {
            return <h1>Point game</h1>;
        }
    };

    const holeRender = () => {
        return (
            <Hole
                maxHoles={maxHoles}
                changeMaxHoles={changeMaxHoles}
                startGame={startGame}
                changeGameState={changeGameState}
            />
        );
    };

    const editMaxHoles = (id: string) => {
        let newMaxHoles = maxHoles;
        if (id === "incrementHoles") {
            newMaxHoles++;
            changeMaxHoles(newMaxHoles);
        } else if (id === "decrementHoles") {
            newMaxHoles--;
            changeMaxHoles(newMaxHoles);
        }
    };

    const renderCreateScorecardButton = () => {
        if (!startGame) {
            return (
                <div className="create-scorecard">
                    <div style={{ float: "left" }} className="max-holes">
                        <div className="holes">Holes:</div>
                        <button
                            id="decrementHoles"
                            onClick={(e: any) => editMaxHoles(e.target.id)}
                        >
                            -
                        </button>
                        <span>{maxHoles}</span>
                        <button
                            id="incrementHoles"
                            onClick={(e: any) => editMaxHoles(e.target.id)}
                        >
                            +
                        </button>
                    </div>
                    <button
                        className="create-scorecard-button"
                        onClick={() => changeGameState(true)}
                    >
                        Create scorecard
                    </button>
                </div>
            );
        }
    };

    return (
        <div className="main">
            {headerRender()}
            {holeRender()}
            {renderCreateScorecardButton()}
        </div>
    );
}

export default Main;
