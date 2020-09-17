import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import classNames from "classnames";

const colorMap = {
  0: "empty",
  1: "red",
  2: "black",
  3: "red",
  4: "black",
};

export default function Game({ leaveGame, movePiece, game, color }) {
  const [selectedPiece, setSelectedPiece] = useState({});

  useEffect(() => {
    return () => leaveGame();
  }, []);

  const selectPiece = (i, j) => {
    if (game.turn !== color) return;
    if (colorMap[game.board[i][j]] !== color) return;
    setSelectedPiece({ i, j });
  };

  const dropSelectedPiece = (i, j) => {
    if (game.turn !== color) return;
    if (game.board[i][j] !== 0) return;
    if ((i + j) % 2 === 1) return;
    movePiece({
      selectedPiece,
      destination: {
        i,
        j,
      },
    });
    setSelectedPiece({});
  };

  const isPieceSelected = (i, j) => {
    return selectedPiece.i === i && selectedPiece.j === j;
  };

  const getColor = (piece) => (piece === 1 ? "red" : "black");

  const renderBoard = () => {
    return (
      <div className="board">
        {game.board.map((row, i) => (
          <div key={i} className="row">
            {row.map((piece, j) => (
              <div
                key={`${i} ${j}`}
                className={classNames("cell", {
                  gray: (i + j) % 2 === 0,
                  white: (i + j) % 2 !== 0,
                })}
                onClick={() => dropSelectedPiece(i, j)}
              >
                {piece !== 0 && (
                  <div
                    className={classNames("piece", {
                      selected: isPieceSelected(i, j),
                      red: piece === 1,
                      black: piece === 2,
                      blackQueen: piece === 4,
                      redQueen: piece === 3,
                      clickable: color === getColor(piece),
                    })}
                    onClick={() => selectPiece(i, j)}
                  ></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const isGameStarted = () => game.numberOfPlayers === 2;

  const renderWaiting = () => {
    return (
      <div className="center">
        <h2 className="mb-4">{game.name}</h2>
        <div className="mb-4">
          <Spinner animation="border" role="status" />
        </div>
        <span>Waiting for an opponent....</span>
      </div>
    );
  };

  const renderGame = () => {
    return (
      <>
        <div className="game__info">
          <h2>Your piece color is {color}</h2>
          {game.turn === color && <h3>It is your turn!</h3>}
          {game.turn !== color && <h3>Waiting for opponent!</h3>}
        </div>
        {renderBoard()}
      </>
    );
  };

  return (
    <div className="center">
      {!isGameStarted() && renderWaiting()}
      {isGameStarted() && renderGame()}
    </div>
  );
}
