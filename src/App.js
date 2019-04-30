import React from "react";
import logo from "./logo.svg";
import "./App.css";

function Square(props) {
    let cName = props.squareClass;

    return <div className={cName} />;
}

class App extends React.Component {
    constructor(props) {
        super();

        this.buildBoard = this.buildBoard.bind(this);
        this.move = this.move.bind(this);
        this.prevDefault = this.prevDefault.bind(this);
        this.winCheck = this.winCheck.bind(this);

        this.state = {
            // prettier-ignore
            board: [
                //       1             2             3             4             5             6             7             8             9            10
                [
        /*1*/       [1, 1, 0, 1], [1, 0, 0, 1], [1, 1, 0, 0], [1, 0, 1, 1], [1, 1, 0, 0], [1, 0, 0, 1], [1, 0, 1, 0], [1, 0, 0, 0], [1, 0, 1, 0], [1, 1, 1, 0]
                ],
                [ 
        /*2*/       [0, 0, 1, 1], [0, 1, 0, 0], [0, 0, 1, 1], [1, 0, 1, 0], [0, 0, 0, 0], [0, 1, 1, 0], [1, 0, 1, 1], [0, 0, 1, 0], [1, 1, 1, 0], [1, 1, 0, 1] 
                ], 
                [
        /*3*/       [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [1, 1, 0, 0], [0, 0, 1, 1], [1, 1, 0, 0], [1, 0, 0, 1], [1, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 0]
                ],
                [
        /*4*/       [0, 1, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0], [0, 1, 0, 1], [1, 0, 0, 1], [0, 0, 1, 0], [0, 0, 1, 0], [1, 1, 0, 0], [1, 0, 1, 1], [0, 1, 0, 0]
                ],
                [
        /*5*/       [0, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [0, 0, 1, 1], [1, 1, 1, 0], [1, 0, 0, 1], [0, 0, 1, 0], [1, 1, 0, 0], [0, 1, 0, 1]
                ],
                [
        /*6*/       [0, 1, 0, 1], [1, 0, 0, 1], [0, 0, 1, 0], [1, 0, 1, 0], [1, 1, 1, 0], [1, 1, 0, 1], [0, 0, 1, 1], [1, 1, 1, 0], [0, 1, 1, 1], [0, 1, 0, 1]
                ],
                [
        /*7*/       [0, 1, 1, 1], [0, 1, 0, 1], [1, 0, 1, 1], [1, 0, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0], [1, 0, 1, 0], [1, 1, 0, 0], [1, 1, 0, 1], [0, 1, 0, 1]
                ],
                [
        /*8*/       [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [1, 1, 0, 0], [0, 1, 1, 1], [0, 1, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0], [0, 1, 0, 1], [0, 1, 0, 1]
                ],
                [
        /*9*/       [0, 1, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0], [0, 0, 0, 1], [1, 0, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1], [1, 1, 0, 0], [0, 0, 1, 1], [0, 1, 1, 0]
                ],
                [
        /*10*/      [0, 0, 1, 1], [0, 1, 1, 0], [1, 0, 1, 1], [0, 1, 1, 0], [0, 0, 1, 1], [1, 0, 1, 0], [1, 1, 1, 0], [0, 0, 1, 1], [1, 0, 1, 0], [1, 1, 1, 0]
                ]
            ],
            xPos: 0,
            yPos: 0
        };
    }

    arrayClone(array) {
        let clone = [...array];
        return clone;

        // return JSON.parse(JSON.stringify(array));
    }

    buildBoard(props) {
        let classData = ["t", "r", "b", "l"];
        let rowsArray = [];

        for (let i = 0; i < 10; i++) {
            console.log(i + "i");
            for (let j = 0; j < 10; j++) {
                console.log(j + "j");

                let squareClass = "";
                let squareId = i + "_" + j;
                for (let k = 0; k < 4; k++) {
                    if (this.state.board[i][j][k] === 1) {
                        squareClass = squareClass.concat(classData[k]);
                    }
                }
                if (i === 9 && j === 9) {
                    squareClass = squareClass.concat(" goal");
                }
                let player =
                    this.state.xPos === j
                        ? this.state.yPos === i
                            ? "player"
                            : "non-player"
                        : "non-player";

                rowsArray.push(
                    <Square
                        squareClass={squareClass + " box " + player}
                        key={squareId}
                        squareId={squareId}
                        x={j}
                        y={i}
                        toggle={this.state.toggle}
                        state={this.state}
                    />
                );
            }
        }
        return <div className="grid">{rowsArray}</div>;
    }

    componentDidMount() {
        // toggle starting position
        document.addEventListener("keydown", this.prevDefault);
        document.addEventListener("keydown", this.move);
    }

    move(e) {
        switch (e.keyCode) {
            case 38: //up
                if (
                    this.state.board[this.state.yPos][this.state.xPos][0] === 0
                ) {
                    this.setState(
                        previousState => {
                            return {
                                yPos: previousState.yPos - 1
                            };
                        },
                        () => this.winCheck()
                    );
                }

                break;
            case 39: //right
                if (
                    this.state.board[this.state.yPos][this.state.xPos][1] === 0
                ) {
                    this.setState(
                        previousState => {
                            return {
                                xPos: previousState.xPos + 1
                            };
                        },
                        () => this.winCheck()
                    );
                }
                break;
            case 40: //down
                if (
                    this.state.board[this.state.yPos][this.state.xPos][2] === 0
                ) {
                    this.setState(
                        previousState => {
                            return {
                                yPos: previousState.yPos + 1
                            };
                        },
                        () => this.winCheck()
                    );
                }
                break;
            case 37: //left
                if (
                    this.state.board[this.state.yPos][this.state.xPos][3] === 0
                ) {
                    this.setState(
                        previousState => {
                            return {
                                xPos: previousState.xPos - 1
                            };
                        },
                        () => this.winCheck()
                    );
                }
                break;
            default:
                break;
        }
    }

    prevDefault(e) {
        if (
            e.keyCode === 37 ||
            e.keyCode === 38 ||
            e.keyCode === 39 ||
            e.keyCode === 40
        ) {
            e.preventDefault();
        } else {
            return false;
        }
    }

    toggle(x, y, status = true) {
        let newArray = this.arrayClone(this.state.board);
        newArray[y][x] = status;

        this.setState({
            board: newArray
        });
    }

    winCheck() {
        if (this.state.xPos === 9 && this.state.yPos === 9) {
            alert("You Win!");
            this.setState({
                xPos: 0,
                yPos: 0
            });
        } else return;
    }

    render() {
        return <div className="view">{this.buildBoard()}</div>;
    }
}

export default App;
