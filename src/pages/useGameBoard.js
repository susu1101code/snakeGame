import { useEffect, useState } from "react";
import getPositionFromRowIndexAndColIndex from "@/pages/utils/getPosition";

export function useGameBoard(gameStart) {
  const [rowLength, setRowLength] = useState(10);
  const [colLength, setColLength] = useState(10);
  const [walls, setWalls] = useState([]);

  function wallsGenerator(rowNum, colNum) {
    const wallsPos = [];
    for (let i = 0; i < rowNum; i++) {
      for (let j = 0; j < colNum; j++) {
        if (i === 0 || i === rowNum - 1 || j === 0 || j === colNum - 1) {
          wallsPos.push(getPositionFromRowIndexAndColIndex(i, j, colNum));
        }
      }
    }
    setWalls(wallsPos);
  }
  useEffect(() => {
    wallsGenerator(rowLength, colLength);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--col-num",
      colLength.toString(),
    );
    document.documentElement.style.setProperty(
      "--row-num",
      rowLength.toString(),
    );
    wallsGenerator(rowLength, colLength);
  }, [rowLength, colLength]);

  function rowAdd() {
    if (gameStart) {
      return;
    }
    setRowLength((prev) => prev + 1);
  }
  function rowReduce() {
    if (gameStart) {
      return;
    }
    setRowLength((prev) => prev - 1);
  }

  function colAdd() {
    if (gameStart) {
      return;
    }
    setColLength((prev) => prev + 1);
  }
  function colReduce() {
    if (gameStart) {
      return;
    }
    setColLength((prev) => prev - 1);
  }

  return [rowLength, colLength, walls, rowAdd, rowReduce, colAdd, colReduce];
}
