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

        this.move = this.move.bind(this);
        this.buildBoard = this.buildBoard.bind(this);

        this.state = {
            location: "",
            gameStarted: false,
            board: [
                ["tl", "t", "t", "t", "tr"],
                ["l", "n", "n", "n", "r"],
                ["l", "n", "n", "n", "r"],
                ["l", "n", "n", "n", "r"],
                ["bl", "b", "b", "b", "rb"]
            ],
            speed: 100,
            xPos: 0,
            yPos: 0,
            xPast: "",
            yPast: ""
        };
    }

    arrayClone(array) {
        let clone = [...array];
        return clone;

        // return JSON.parse(JSON.stringify(array));
    }

    buildBoard(props) {
        let rowsArray = [];
        let squareClass = "";

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let squareId = i + "_" + j;
                switch (this.state.board[i][j]) {
                    case "t":
                        squareClass = "t";
                        break;
                    case "r":
                        squareClass = "r";
                        break;

                    case "b":
                        squareClass = "b";
                        break;

                    case "l":
                        squareClass = "l";
                        break;

                    case "tr":
                        squareClass = "tr";
                        break;

                    case "rb":
                        squareClass = "rb";
                        break;

                    case "bl":
                        squareClass = "bl";
                        break;

                    case "tl":
                        squareClass = "tl";
                        break;
                    default:
                        squareClass = "box";
                }

                let player =
                    this.state.xPos === j
                        ? this.state.yPos === i
                            ? "player"
                            : "non-player"
                        : "non-player";

                rowsArray.push(
                    <Square
                        squareClass={squareClass + " " + player}
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

        document.addEventListener("keydown", this.move);
    }

    move(e) {
        switch (e.keyCode) {
            case 38: //up
                this.setState(previousState => {
                    return {
                        yPos: previousState.yPos - 1,
                        xPast: previousState.xPos,
                        yPast: previousState.yPos
                    };
                });
                break;
            case 39: //right
                this.setState(previousState => {
                    return {
                        xPos: previousState.xPos + 1,
                        xPast: previousState.xPos,
                        yPast: previousState.yPos
                    };
                });
                break;
            case 40: //down
                this.setState(previousState => {
                    return {
                        yPos: previousState.yPos + 1,
                        xPast: previousState.xPos,
                        yPast: previousState.yPos
                    };
                });
                break;
            case 37: //left
                this.setState(previousState => {
                    return {
                        xPos: previousState.xPos - 1,
                        xPast: previousState.xPos,
                        yPast: previousState.yPos
                    };
                });
                break;
            default:
                break;
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
                <h2 class="score">Round: Niiice</h2>
                <div className="view">{this.buildBoard()}</div>
            </div>
        );
    }
}

export default App;
