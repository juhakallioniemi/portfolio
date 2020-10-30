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
            playerListHoleThrows: Array(props.playerList.length).fill(0),
            playerListHolePoints: Array(props.playerList.length).fill(0)
        };
    }

    const calculateMaxPointsPerHole = () => {
        let pointsPerHole = 0;
        for (let i = 0; i < props.playerList.length; i++) {
            pointsPerHole += props.playerList.length - i;
        }
        return pointsPerHole;
    };

    const coursePar = () => {
        return props.maxHoles * 3;
    }

    const [playerSharedPoints, setPlayerSharePoints] = useState(
        playerSharedInitialPoints
    );

    const [playerTotalPoints, setPlayerTotalPoints] = useState(Array(props.playerList.length).fill(0));
    const [playerTotalThrows, setPlayerTotalThrows] = useState(Array(props.playerList.length).fill(0));

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
                let totalThrowsList: number[] = [];
                for (let i = 0; i < props.playerList.length; i++) {
                    totalPointsList[i] = 0;
                    totalThrowsList[i] = 0;
                    for (let j = 0; j < props.maxHoles; j++) {
                        totalPointsList[i] += playerSharedPoints[j].playerListHolePoints[i];
                        totalThrowsList[i] += playerSharedPoints[j].playerListHoleThrows[i];
                    }
                }
                setPlayerTotalPoints(totalPointsList);
                setPlayerTotalThrows(totalThrowsList);
            }
        }

        if (props.isHoleChanged) {
            let newPlayerList = [...props.playerList];

            for (let i = 0; i < newPlayerList.length; i++) {
                newPlayerList[i].playerHoleThrows = playerSharedPoints[props.holeNumber - 1].playerListHoleThrows[i];
                newPlayerList[i].playerHolePoints = playerSharedPoints[props.holeNumber - 1].playerListHolePoints[i];
                newPlayerList[i].playerTotalPoints = playerTotalPoints;
                newPlayerList[i].playerTotalThrows = playerTotalThrows;
            }

            props.updatePlayerList(newPlayerList);
            props.changeIsHoleChangeValueFromChild(false);
        }

        if (props.isFinishClicked)
            setAllHolesMarked();
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

    const setAllHolesMarked = () => {
        let newPlayerList = [...props.playerList];

        for (let i = 0; i < props.playerList.length; i++) {
            let allMarked = true;
            for (let j = 0; j < props.maxHoles; j++) {
                if (playerSharedPoints[j].playerListHolePoints[i] === 0)
                    allMarked = false;
            }
            newPlayerList[i].allHolesMarked = allMarked;
        }

        props.updatePlayerList(newPlayerList);

    }

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

    const totalScoreComparedWithCoursePar = (playerTotalThrows: any) => {
        let totalScore = playerTotalThrows - coursePar();
        if (totalScore === 0) return "E";
        else if (totalScore > 0) return "+" + totalScore;
        else return totalScore;
    }

    const loopThrougPlayers: any = (playerList: any) => {
        return (
            <div>
                <h2>Total Points:</h2>
                <ul>
                    {playerList.map((p: any, index: number) => {
                        return (
                            <li key={index}>
                                <div className="listed-player">
                                    <div className="player-name">{p.playerName}</div>

                                    <div className="player-total-points">
                                        {playerTotalPoints[index] ? playerTotalPoints[index] : 0} p.
                                </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                {/* {props.isGameFinished ? <React.Fragment><h2>Total Throws:</h2>
                    <ul>
                        {playerList.map((p: any, index: number) => {
                            return (
                                <li key={index}>
                                    <div className="listed-player">
                                        <div className="player-name">{p.playerName}</div>

                                        <div className="player-total-throws">
                                            <div className="throws">{playerTotalThrows[index] ? playerTotalThrows[index] : 0}</div>

                                            {p.allHolesMarked
                                                ? <div className="score">
                                                    <span>(</span>
                                                    <span style={{ color: "red" }}>{totalScoreComparedWithCoursePar(playerTotalThrows[index])}</span>
                                                    <span>)</span>
                                                </div>
                                                : <div style={{ fontSize: "0.75em", fontStyle: "italic" }} className="score">(Player did not finish.)</div>
                                            }
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <br></br>
                    <div style={{ fontStyle: "italic" }}>Course par: {coursePar()}</div>
                </React.Fragment> : null} */}
            </div>
        );
    };

    return (
        <div className="total-points">
            {!props.isGameFinished ? <div className="max-points">Max points per hole: {maxPointsPerHole}</div> : null}
            {loopThrougPlayers(props.playerList)}
        </div>
    );
}

export default TotalPoints;
