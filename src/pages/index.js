import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useGameBoard } from "@/pages/useGameBoard";
import useSnake from "@/pages/useSnake";
import getPositionFromRowIndexAndColIndex from "@/pages/utils/getPosition";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //TODO 怎么判断一个变量是state还是变量，
  // 当state变多的时候，代码变得很耦合
  // process.env.
  // 可选升级
  //    增加食物种类以及功能
  //    增加分数
  //    增加蛇头尾的碰撞检测
  //    优化外观
  //    优化性能减少延迟

  const [gameStart, setGameStart] = useState(false);
  const [rowLength, colLength, walls, rowAdd, rowReduce, colAdd, colReduce] =
    useGameBoard(gameStart);
  const [snakeList, foodPosition] = useSnake(
    rowLength,
    colLength,
    walls,
    gameStart,
    setGameStart,
  );

  function gameStartHandler() {
    setGameStart(true);
  }

  //TODO
  // snake stuck by itself

  return (
    <div className={"flex flex-col justify-center items-center"}>
      <div className={"flex flex-col justify-center mt-10"}>
        <div className={"flex flex-row justify-center mt-5 "}>
          <button
            className={[
              "rounded-md  px-4 mx-4",
              gameStart ? "bg-disable" : "bg-snake",
            ].join(" ")}
            onClick={rowReduce}
          >
            Reduce Row
          </button>
          {rowLength}
          <button
            className={[
              "rounded-md  px-4 mx-4",
              gameStart ? "bg-disable" : "bg-snake",
            ].join(" ")}
            onClick={rowAdd}
          >
            Add Row
          </button>
        </div>
        <div className={"flex flex-row justify-center my-2 "}>
          <button
            className={[
              "rounded-md  px-4 mx-4",
              gameStart ? "bg-disable" : "bg-snake",
            ].join(" ")}
            onClick={colReduce}
          >
            Reduce Column
          </button>
          {colLength}
          <button
            className={[
              "rounded-md  px-4 mx-4",
              gameStart ? "bg-disable" : "bg-snake",
            ].join(" ")}
            onClick={colAdd}
          >
            Add Column
          </button>
        </div>
        <button className={"border-2"} onClick={gameStartHandler}>
          start
        </button>
      </div>

      <div className={"flex justify-center h-lvh w-lvw"}>
        <section className="grid grid-cols-dynamic-col-50px grid-rows-dynamic-row-50px p-10">
          {Array.apply(null, Array(rowLength)).map((_, rowIndex) => {
            return Array.apply(null, Array(colLength)).map((_, colIndex) => {
              let curPos = getPositionFromRowIndexAndColIndex(
                rowIndex,
                colIndex,
                colLength,
              );
              return (
                // eslint-disable-next-line react/jsx-key
                <div
                  className={[
                    "border-solid border-2 border-black",
                    walls.includes(curPos) ? "bg-wall" : null,
                    foodPosition === curPos ? "bg-food" : null,
                    snakeList.includes(curPos) ? "bg-snake" : null,
                  ].join(" ")}
                >
                  {curPos}
                </div>
              );
            });
          })}
        </section>
      </div>
    </div>
  );
}
