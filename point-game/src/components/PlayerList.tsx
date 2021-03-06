import React, { useState, useEffect } from "react";
import TotalPoints from "./TotalPoints";

// Point-game projektissa on niin huonoa ja nopeesti väännettyä koodia,
// että ethän tuomitse. Arvioi jotain muuta projektia. Kiitos!

const holeDefaultThrows: number = 0;
const holeDefaultPoints: number = 0;

var defaultPlayerList: {
    playerName: string;
    playerTotalPoints: number;
    playerTotalThrows: number;
    playerHoleRank: number;
    playerHoleThrows: number;
    playerHolePoints: number;
    allHolesMarked: boolean;
}[] = [
        {
            playerName: "Juha",
            playerTotalPoints: 0,
            playerTotalThrows: 0,
            playerHoleRank: 0,
            playerHoleThrows: holeDefaultThrows,
            playerHolePoints: holeDefaultPoints,
            allHolesMarked: false
        },
        {
            playerName: "Timo",
            playerTotalPoints: 0,
            playerTotalThrows: 0,
            playerHoleRank: 0,
            playerHoleThrows: holeDefaultThrows,
            playerHolePoints: holeDefaultPoints,
            allHolesMarked: false
        },
        {
            playerName: "Tommi",
            playerTotalPoints: 0,
            playerTotalThrows: 0,
            playerHoleRank: 0,
            playerHoleThrows: holeDefaultThrows,
            playerHolePoints: holeDefaultPoints,
            allHolesMarked: false
        },
        // {
        //     playerName: "Janpe",
        //     playerTotalPoints: 0,
        //     playerTotalThrows: 0,
        //     playerHoleRank: 0,
        //     playerHoleThrows: holeDefaultThrows,
        //     playerHolePoints: holeDefaultPoints,
        //     allHolesMarked: false
        // },
        // {
        //     playerName: "Roope",
        //     playerTotalPoints: 0,
        //     playerTotalThrows: 0,
        //     playerHoleRank: 0,
        //     playerHoleThrows: holeDefaultThrows,
        //     playerHolePoints: holeDefaultPoints,
        //      allHolesMarked: false,
        // },
        // {
        //     playerName: "Miika",
        //     playerTotalPoints: 0,
        //     playerTotalThrows: 0,
        //     playerHoleRank: 0,
        //     playerHoleThrows: holeDefaultThrows,
        //     playerHolePoints: holeDefaultPoints,
        //      allHolesMarked: false,
        // },

        {
            playerName: "Mikko",
            playerTotalPoints: 0,
            playerTotalThrows: 0,
            playerHoleRank: 0,
            playerHoleThrows: holeDefaultThrows,
            playerHolePoints: holeDefaultPoints,
            allHolesMarked: false,
        }
    ];


function PlayerList(props: any) {
    const [playerList, setPlayerList] = useState(defaultPlayerList);
    const [newPlayer, setNewPlayer] = useState(null);
    const [isPlayerThrowsChanged, setIsPlayerThrowsChanged] = useState(false);

    const playerHoleDefaultPoints = (value: number) => {
        let pointsPerHole = 0;
        let newPlayerListLength = playerList.length + value;
        for (let i = 0; i < newPlayerListLength; i++) {
            pointsPerHole += newPlayerListLength - i;
        }
        return pointsPerHole / newPlayerListLength; // 4 (jos 7 pelaajaa)
    };

    const removePlayer: any = (playerName: string) => {
        let newList = [...playerList];
        let playerIndex = newList.findIndex(
            (p: any) => p.playerName === playerName
        );
        newList.splice(playerIndex, 1);

        for (let i = 0; i < newList.length; i++) {
            newList[i].playerHolePoints = playerHoleDefaultPoints(-1);
        }

        setPlayerList(newList);
    };

    const isAllThrowsSet = () => {
        let setAmount = 0;
        let maxSet = playerList.length;

        for (let i = 0; i < playerList.length; i++) {
            if (playerList[i].playerHoleThrows > 0) {
                setAmount++;
            }
        }

        if (setAmount === maxSet) {
            return true;
        } else return false;
    };

    const renderPlayerHolePoints = (player: any) => {
        if (props.startGame) {
            return (
                <span
                    style={{
                        float: "right",
                        width: "auto",
                        color: "blue",
                        marginRight: "3vw"
                    }}
                >
                    {isAllThrowsSet() && player.playerHolePoints ? player.playerHolePoints : 0} p.
                </span>
            );
        }
    };

    const renderPlayerTotalThrows = (player: any, index: number) => {
        let defaultHoleThrows = 3;
        let playerThrows = defaultHoleThrows;

        if (player.playerHoleThrows !== 0) playerThrows = player.playerHoleThrows;

        let totalThrows = (((18 - props.holeNumber) * defaultHoleThrows) + playerThrows) - (props.coursePar - (props.holeNumber - 1) * defaultHoleThrows);

        if (totalThrows === 0)
            return "E";
        else if (totalThrows < 0)
            return totalThrows;
        else
            return "+" + totalThrows;
    }

    const loopThrougPlayers: any = (playerList: any) => {
        return (
            <ul>
                {playerList.map((player: any, index: number) => {
                    return (
                        <li key={index}>
                            <div className="listed-player">
                                <span>
                                    {player.playerName}
                                    {/* (
                                    <span
                                        style={{ width: "auto", color: "red" }}
                                    >
                                        {renderPlayerTotalThrows(player, index)}
                                    </span>
                                    ) */}
                                </span>
                                {renderRemoveButton(player)}
                                {renderEditThrows(player)}
                                {renderPlayerHolePoints(player)}
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const newPlayerField = () => {
        if (!props.startGame) {
            return (
                <div className="add-player">
                    <input
                        id="new-player"
                        onChange={(e: any) => setNewPlayer(e.target.value)}
                    ></input>
                    <button onClick={() => addNewPlayer()}>Add Player</button>
                </div>
            );
        }
    };

    const renderEditThrows = (player: any) => {
        if (props.startGame) {
            return (
                <div className="add-throws">
                    <button
                        id="decrementThrows"
                        onClick={(e: any) =>
                            editPlayerThrows(e.target.id, player)
                        }
                    >
                        -
                    </button>
                    <span>
                        {player.playerHoleThrows
                            ? player.playerHoleThrows
                            : "-"}
                    </span>
                    <button
                        id="incrementThrows"
                        onClick={(e: any) =>
                            editPlayerThrows(e.target.id, player)
                        }
                    >
                        +
                    </button>
                </div>
            );
        }
    };

    const editPlayerThrows = (id: string, player: any) => {
        let newPlayerList = [...playerList];
        let playerIndex = newPlayerList.indexOf(player);
        let playerThrows = newPlayerList[playerIndex].playerHoleThrows;

        if (id === "decrementThrows") {
            if (!playerThrows) playerThrows = 2;
            else if (playerThrows > 1) {
                playerThrows--;
            }
        } else if (id === "incrementThrows") {
            if (playerThrows) playerThrows++;
            else playerThrows = 3;
        }

        newPlayerList[playerIndex].playerHoleThrows = playerThrows;
        setPlayerList(newPlayerList);
        setIsPlayerThrowsChanged(true);
    };

    useEffect(() => {
        setIsPlayerThrowsChanged(false);
    });

    const renderRemoveButton = (p: any) => {
        if (!props.startGame) {
            return (
                <button
                    onClick={() => removePlayer(p.playerName)}
                    className="remove-button"
                >
                    x
                </button>
            );
        }
    };

    const addNewPlayer: any = (e: any) => {
        let newList = [...playerList];
        newList.push({
            playerName: newPlayer,
            playerTotalPoints: 0,
            playerTotalThrows: 0,
            playerHoleRank: 0,
            playerHoleThrows: holeDefaultThrows,
            playerHolePoints: 0,
            allHolesMarked: false
        });

        for (let i = 0; i < newList.length; i++) {
            newList[i].playerHolePoints = playerHoleDefaultPoints(1);
        }

        if (newPlayer.length !== 0) setPlayerList(newList);
    };

    const totalPointsRender = () => {
        if (props.startGame)
            return (
                <TotalPoints
                    playerList={playerList}
                    updatePlayerList={updatePlayerList}
                    isPlayerThrowsChanged={isPlayerThrowsChanged}
                    holeNumber={props.holeNumber}
                    maxHoles={props.maxHoles}
                    startGame={props.startGame}
                    isHoleChanged={props.isHoleChanged}
                    saveScoresFromChild={props.saveScoresFromChild}
                    changeIsHoleChangeValueFromChild={
                        props.changeIsHoleChangeValueFromChild
                    }
                    isGameFinished={props.isGameFinished}
                    isFinishClicked={props.isFinishClicked}
                />
            );
    };

    const updatePlayerList = (value: any) => {
        setPlayerList(value);
    };

    return (
        <div className="player-list">
            {!props.isGameFinished ?
                <div >
                    {newPlayerField()}
                    <br></br>
                    <div>
                        {!props.startGame ? <h2>Players:</h2> : <h2>Scores:</h2>}
                        {loopThrougPlayers(playerList)}
                    </div>
                </div> : null}
            {totalPointsRender()}
        </div>
    );


}

export default PlayerList;
