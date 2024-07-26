import { useEffect, useState } from "react";
import randomPosition from "@/pages/utils/getRandomPosition";

export default function useSnake(
  rowLength,
  colLength,
  walls,
  gameStart,
  setGameStart,
) {
  const INIT_DIRECT = "Right";
  const [snakeList, setSnakeList] = useState([]);
  const [speed, setSpeed] = useState(300);
  const [foodPosition, setFoodPosition] = useState(0);
  const [snakeDirection, setSnakeDirection] = useState(INIT_DIRECT);
  const [move, setMove] = useState(false);

  useEffect(() => {
    if (!gameStart) {
      return;
    }
    const snake = snakeGenerator();
    foodGenerator(walls, snake);
    setMove(true);
  }, [gameStart]);

  function foodGenerator(walls, snake) {
    let position = randomPosition();
    while (snake.includes(position) || walls.includes(position)) {
      position = randomPosition();
    }
    setFoodPosition(position);
  }

  function snakeGenerator(length = 1) {
    const snake = [
      Math.floor((rowLength - 1) / 2) * colLength +
        Math.floor((colLength - 1) / 2),
    ];
    setSnakeList(snake);
    return snake;
  }

  //TODO
  // 有延迟
  // 想问这个清除interval和每次设置一次1秒计时器有什么区别
  useEffect(() => {
    const interval = setInterval(() => {
      snakeMove(move, snakeDirection, interval);
    }, speed);
    window.addEventListener("keydown", snakeTurnHandler);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", snakeTurnHandler);
    };
  }, [snakeList, move]);

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

  function gameOverHandler(position) {
    if (walls.includes(position)) {
      alert("gameOver");
      setGameStart(false);
      setMove(false);
      return true;
    }
    return false;
  }

  function foodEatenHandler(snakeHeadPosition, foodPosition) {
    if (snakeHeadPosition === foodPosition) {
      setSnakeList([snakeHeadPosition, ...snakeList]);
      foodGenerator(walls, snakeList);
      return;
    }
    setSnakeList([snakeHeadPosition, ...snakeList.slice(0, -1)]);
  }
  function snakeMove(move, snakeDirection, interval) {
    if (!move) {
      clearInterval(interval);
      return;
    }
    var newPosition;
    switch (snakeDirection) {
      case "Up":
        newPosition = snakeList[0] - colLength;
        break;
      case "Down":
        newPosition = snakeList[0] + colLength;
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
    if (gameOverHandler(newPosition)) {
      return;
    }
    foodEatenHandler(newPosition, foodPosition);
  }
  return [snakeList, foodPosition];
}
