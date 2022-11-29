import { useState } from 'react';
import './App.css';

type GridCell = {
  row: number;
  column: number;
};

const App = () => {
  const [grid, setGrid] = useState([
    [1, 2, 3, 4],
    [2, 1, 4, 3],
    [5, 6, 5, 6],
  ]);

  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length)
      .fill('')
      .map(() => new Array(grid[0].length).fill(false))
  );

  const [previousClick, setPreviousClick] = useState<GridCell | undefined>();

  const handleCardClick = (rowIndex: number, columnIndex: number) => {
    if (revealedGrid[rowIndex][columnIndex]) return;

    const clickedNumber = grid[rowIndex][columnIndex];

    const updatedRevealedGrid = [...revealedGrid];
    updatedRevealedGrid[rowIndex][columnIndex] = true;
    setRevealedGrid(updatedRevealedGrid);

    if (previousClick) {
      const previousClickNumber = grid[previousClick.row][previousClick.column];
      if (previousClickNumber !== clickedNumber) {
        setTimeout(() => {
          updatedRevealedGrid[previousClick.row][previousClick.column] = false;
          updatedRevealedGrid[rowIndex][columnIndex] = false;
          setRevealedGrid([...updatedRevealedGrid]);
        }, 1000);
      } else {
        const hasWon = revealedGrid.flat().every((isRevealed) => isRevealed);
        if (hasWon)
          setTimeout(() => {
            alert('Congratulations! You won!');
          });
      }
      setPreviousClick(undefined);
    } else {
      setPreviousClick({ row: rowIndex, column: columnIndex });
    }
  };

  return (
    <div className="App">
      <h3>Guessing game</h3>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((number, columnIndex) => (
              <div
                className="card"
                key={columnIndex}
                onClick={() => handleCardClick(rowIndex, columnIndex)}
              >
                {revealedGrid[rowIndex][columnIndex] ? number : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
