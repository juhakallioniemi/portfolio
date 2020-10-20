import React, { useState, useEffect } from "react";

const playerSharedInitialPoints: {
    holeNumber: number;
    playerListHoleThrows: number[];
    playerListHolePoints: number[];
}[] = [];

function TotalPoints(props: any) {
    for (let i = 0; i < props.maxHoles; i++) {
        playerSharedInitialPoints[i] = {
            holeNumber: i + 1,
            playerListHoleThrows: [],
            playerListHolePoints: [],
        };
    }

    const calculateMaxPointsPerHole = () => {
        let pointsPerHole = 0;
        for (let i = 0; i < props.playerList.length; i++) {
            pointsPerHole += props.playerList.length - i;
        }
        return pointsPerHole;
    };

    const [playerSharedPoints, setPlayerSharePoints] = useState(
        playerSharedInitialPoints
    );

    const maxPointsPerHole = calculateMaxPointsPerHole();

    const getOccurrence = (array: any, value: number) => {
        return array.filter((v: number) => v === value).length;
    };

    useEffect(() => {
        if (props.isPlayerThrowsChanged) {
            calculatePoints();
        }

        if (
            props.resetHolePoints &&
            playerSharedPoints[props.holeNumber - 1].playerListHolePoints
                .length <= 0
        ) {
            let newPlayerList = [...props.playerList];
            for (let i = 0; i < newPlayerList.length; i++) {
                newPlayerList[i].playerHoleThrows = 3;
            }
            props.updatePlayerList(newPlayerList);
            props.changeResetHolePointsValueFromChild(false);
        }
    });

    const calculatePoints = () => {
        let playerHoleThrows = props.playerList.map(
            (p: any) => p.playerHoleThrows
        );

        let sorted = playerHoleThrows.slice().sort(function (a: any, b: any) {
            return a - b;
        });

        let playersByRankOrder = playerHoleThrows.map(function (v: any) {
            return sorted.indexOf(v) + 1;
        });

        let pointsByRank = 0;
        let playerRankPoints: any = [];

        for (var i = 1; i <= playersByRankOrder.length; i++) {
            let occu = getOccurrence(playersByRankOrder, i);

            for (let j = 0; j < occu; j++) {
                pointsByRank += props.playerList.length - i + 1 - j;
            }

            playersByRankOrder.forEach((playerRank: number, index: number) => {
                if (playerRank === i) {
                    playerRankPoints.splice(index, 0, pointsByRank / occu);
                }
            });
            pointsByRank = 0;
        }

        let newPlayerList: any = [...props.playerList];
        let newHoleSharedPoints: any = [...playerSharedPoints];

        for (let i = 0; i < newPlayerList.length; i++) {
            newPlayerList[i].playerHolePoints = playerRankPoints[i];
        }

        for (let i = 0; i < newPlayerList.length; i++) {
            newHoleSharedPoints[props.holeNumber - 1].playerListHoleThrows[i] =
                newPlayerList[i].playerHolePoints;

            newHoleSharedPoints[props.holeNumber - 1].playerListHolePoints[i] =
                newPlayerList[i].playerHoleThrows;
        }

        setPlayerSharePoints([...newHoleSharedPoints]);

        console.log(playerSharedPoints);

        props.updatePlayerList(newPlayerList);
    };

    const loopThrougPlayers: any = (playerList: any) => {
        return (
            <ul>
                {playerList.map((p: any, index: number) => {
                    return (
                        <li key={index}>
                            <div className="listed-player">
                                <span>{p.playerName}</span>

                                <span
                                    style={{
                                        float: "right",
                                        width: "auto",
                                        color: "red",
                                    }}
                                >
                                    {p.playerTotalPoints} p.
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="total-points">
            <h2>Total Points:</h2>
            <p>Max points per hole: {maxPointsPerHole}</p>
            {loopThrougPlayers(props.playerList)}
        </div>
    );
}

export default TotalPoints;
