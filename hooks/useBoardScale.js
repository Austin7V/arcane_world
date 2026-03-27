import { useEffect, useState } from "react";

export default function useBoardScale(boardWidth, boardHeight) {
  const [boardScale, setBoardScale] = useState(1);

  useEffect(() => {
    function updateBoardScale() {
      const widthScale = window.innerWidth / boardWidth;
      const heightScale = window.innerHeight / boardHeight;
      const nextScale = Math.min(widthScale, heightScale);

      setBoardScale(nextScale);
    }

    updateBoardScale();
    window.addEventListener("resize", updateBoardScale);

    return () => {
      window.removeEventListener("resize", updateBoardScale);
    };
  }, [boardWidth, boardHeight]);

  return boardScale;
}
