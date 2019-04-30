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

        this.state = {
            location: "",
            gameStarted: false,
            board: [
                [
                    [1, 1, 0, 1],
                    [1, 0, 0, 1],
                    [1, 0, 1, 0],
                    [1, 0, 1, 0],
                    [1, 1, 0, 0]
                ],
                [
                    [0, 0, 1, 1],
                    [0, 1, 0, 0],
                    [1, 0, 1, 1],
                    [1, 0, 1, 0],
                    [0, 1, 0, 0]
                ],
                [
                    [1, 0, 0, 1],
                    [0, 1, 1, 0],
                    [1, 0, 0, 1],
                    [1, 1, 0, 0],
                    [0, 1, 1, 1]
                ],
                [
                    [0, 1, 0, 1],
                    [1, 0, 0, 1],
                    [0, 1, 1, 0],
                    [0, 0, 0, 1],
                    [1, 1, 0, 0]
                ],
                [
                    [0, 0, 1, 1],
                    [0, 1, 1, 0],
                    [1, 0, 1, 1],
                    [0, 1, 1, 0],
                    [0, 1, 1, 1]
                ]
            ],
            speed: 100,
            xNext: 0,
            yNext: 0
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

        for (let i = 0; i < 5; i++) {
            console.log(i + "i");
            for (let j = 0; j < 5; j++) {
                console.log(j + "j");

                let squareClass = "";
                let squareId = i + "_" + j;
                for (let k = 0; k < 4; k++) {
                    console.log(k + "k");
                    switch (this.state.board[i][j][k]) {
                        case 0:
                            break;
                        case 1:
                            squareClass = squareClass.concat(classData[k]);
                            break;
                        default:
                            console.log("no");
                    }
                }
                let player =
                    this.state.xNext === j
                        ? this.state.yNext === i
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
                    this.state.board[this.state.yNext][this.state.xNext][0] ===
                    0
                ) {
                    this.setState(previousState => {
                        return {
                            yNext: previousState.yNext - 1
                        };
                    });
                }

                break;
            case 39: //right
                if (
                    this.state.board[this.state.yNext][this.state.xNext][1] ===
                    0
                ) {
                    this.setState(previousState => {
                        return {
                            xNext: previousState.xNext + 1
                        };
                    });
                }
                break;
            case 40: //down
                if (
                    this.state.board[this.state.yNext][this.state.xNext][2] ===
                    0
                ) {
                    this.setState(previousState => {
                        return {
                            yNext: previousState.yNext + 1
                        };
                    });
                }
                break;
            case 37: //left
                if (
                    this.state.board[this.state.yNext][this.state.xNext][3] ===
                    0
                ) {
                    this.setState(previousState => {
                        return {
                            xNext: previousState.xNext - 1
                        };
                    });
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

    render() {
        return (
            <div>
                <h2 className="score">Round: Niiice</h2>
                <div className="view">{this.buildBoard()}</div>
            </div>
        );
    }
}

export default App;
