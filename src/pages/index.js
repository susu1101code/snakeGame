import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //TODO 环境变量用不了，css怎么读环境变量
  // process.env.
  // 可选升级
  //    增加食物种类以及功能
  //    增加分数
  //    增加蛇头尾的碰撞检测
  //    优化外观
  //    优化性能减少延迟

  const INIT_DIRECT = "Right";
  const ROW_LENGTH = 10;
  const COL_LENGTH = 10;
  const row = Array.apply(null, Array(ROW_LENGTH));
  const column = Array.apply(null, Array(COL_LENGTH));

  const [snakeList, setSnakeList] = useState([]);
  const [foodPosition, setFoodPosition] = useState(0);
  const [snakeDirection, setSnakeDirection] = useState(INIT_DIRECT);
  const [walls, setWalls] = useState([]);
  const [speed, setSpeed] = useState(300);
  const [gameStart, setGameStart] = useState(false);

  function wallsGenerator() {
    const wallsPos = [];
    for (let i = 0; i < ROW_LENGTH; i++) {
      for (let j = 0; j < COL_LENGTH; j++) {
        if (
          i === 0 ||
          i === ROW_LENGTH - 1 ||
          j === 0 ||
          j === COL_LENGTH - 1
        ) {
          wallsPos.push(getPositionFromRowIndexAndColIndex(i, j));
        }
      }
    }
    setWalls(wallsPos);
    return wallsPos;
  }
  function getPositionFromRowIndexAndColIndex(rowIndex, colIndex) {
    return rowIndex * ROW_LENGTH + colIndex;
  }

  function randomPosition(min = 0, max = 99) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function isValidTurn(prevDirection, direction) {
    const directions = {
      Up: ["Left", "Right"],
      Down: ["Left", "Right"],
      Left: ["Up", "Down"],
      Right: ["Up", "Down"],
    };

    return directions[prevDirection].includes(direction);
  }
  function snakeTurnHandler(event) {
    const direction = {
      ArrowUp: "Up",
      ArrowDown: "Down",
      ArrowLeft: "Left",
      ArrowRight: "Right",
    }[event.key];
    if (direction && isValidTurn(snakeDirection, direction)) {
      setSnakeDirection(direction);
    }
  }
  function gameInit() {
    const w = wallsGenerator();
    const s = snakeGenerator();
    foodGenerator(w, s);
    setGameStart(true);
  }
  function gameStartHandler() {
    gameInit();
  }
  useEffect(() => {
    const w = wallsGenerator();
  }, []);

  //TODO
  // 有延迟
  useEffect(() => {
    const interval = setInterval(() => {
      snakeMove(interval);
    }, speed);
    window.addEventListener("keydown", snakeTurnHandler);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", snakeTurnHandler);
    };
  }, [snakeList, gameStart]);

  function foodGenerator(w, s) {
    let position = randomPosition();
    while (s.includes(position) || w.includes(position)) {
      position = randomPosition();
    }
    setFoodPosition(position);
  }

  //TODO longer gameInit snake
  // in random position
  function snakeGenerator(length = 1) {
    setSnakeList([44]);
    return [44];
  }

  function snakeMove(interval) {
    if (!gameStart) {
      clearInterval(interval);
      return;
    }
    var newPosition;
    switch (snakeDirection) {
      case "Up":
        newPosition = snakeList[0] - COL_LENGTH;
        break;
      case "Down":
        newPosition = snakeList[0] + ROW_LENGTH;
        break;
      case "Left":
        newPosition = snakeList[0] - 1;
        break;
      case "Right":
        newPosition = snakeList[0] + 1;
        break;
      default:
      // code block
    }
    if (gameOverCheck(newPosition)) {
      return;
    }
    if (newPosition === foodPosition) {
      setSnakeList([newPosition, ...snakeList]);
      foodGenerator(walls, snakeList);
    } else {
      setSnakeList([newPosition, ...snakeList.slice(0, -1)]);
    }
  }
  //TODO
  // snake stuck by itself
  function gameOverCheck(position) {
    if (walls.includes(position)) {
      alert("gameOver");
      setGameStart(false);
      return true;
    }
    return false;
  }

  return (
    <div className={"body-container"}>
      <section className="board-grid__container">
        {row.map((_, rowIndex) => {
          return column.map((_, colIndex) => {
            let curPos = getPositionFromRowIndexAndColIndex(rowIndex, colIndex);
            return (
              // eslint-disable-next-line react/jsx-key
              <div
                className={[
                  "grid-item",
                  walls.includes(curPos) ? "wall" : null,
                  foodPosition === curPos ? "food" : null,
                  snakeList.includes(curPos) ? "snake" : null,
                ].join(" ")}
              ></div>
            );
          });
        })}
      </section>
      <button onClick={gameStartHandler}>start</button>
    </div>
  );
}
