import React, { useState, useEffect } from "react";

// Point-game projektissa on niin huonoa ja nopeesti väännettyä koodia,
// että ethän tuomitse. Arvioi jotain muuta projektia. Kiitos!

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
            playerListHolePoints: [0, 0, 0],
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

    const [playerTotalPoints, setPlayerTotalPoints] = useState([]);

    const maxPointsPerHole = calculateMaxPointsPerHole();

    const getOccurrence = (array: any, value: number) => {
        return array.filter((v: number) => v === value).length;
    };

    useEffect(() => {
        if (props.isPlayerThrowsChanged) {
            calculatePoints();
            props.changeIsHoleChangeValueFromChild(false);

            if (isAllThrowsSet()) {
                let totalPointsList: number[] = [];
                for (let i = 0; i < props.playerList.length; i++) {
                    totalPointsList[i] = 0;
                    for (let j = 0; j < props.maxHoles; j++) {
                        totalPointsList[i] += playerSharedPoints[j].playerListHolePoints[i];
                    }
                }
                setPlayerTotalPoints(totalPointsList);

            }
        }

        if (props.isHoleChanged) {
            let newPlayerList = [...props.playerList];

            for (let i = 0; i < newPlayerList.length; i++) {
                newPlayerList[i].playerHoleThrows = playerSharedPoints[props.holeNumber - 1].playerListHoleThrows[i];
                newPlayerList[i].playerHolePoints = playerSharedPoints[props.holeNumber - 1].playerListHolePoints[i];
                newPlayerList[i].playerTotalPoints = playerTotalPoints;
            }

            props.updatePlayerList(newPlayerList);
            props.changeIsHoleChangeValueFromChild(false);
        }
    });

    const isAllThrowsSet = () => {
        let arr = playerSharedPoints[props.holeNumber - 1].playerListHoleThrows;
        let setAmount = 0;
        let maxSet = props.playerList.length;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > 0) {
                setAmount++;
            }
        }

        if (setAmount === maxSet) {
            return true;
        } else return false;
    };

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
                newPlayerList[i].playerHoleThrows;

            newHoleSharedPoints[props.holeNumber - 1].playerListHolePoints[i] =
                newPlayerList[i].playerHolePoints;
        }

        if (isAllThrowsSet()) setPlayerSharePoints([...newHoleSharedPoints]); // <-- tää vaa tallentaa väylänvaihtoa varten

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
