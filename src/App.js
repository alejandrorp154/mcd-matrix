import React, { useState } from 'react';
import './App.css';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [criteria, setCriteria] = useState(['Criteria 1', 'Criteria 2']);
  const [decisions, setDecisions] = useState(['Decision 1', 'Decision 2']);
  const [matrix, setMatrix] = useState([
    [5, 8],
    [3, 7],
  ]);

  const addCriteria = () => {
    const newCriteria = `Criteria ${criteria.length + 1}`;
    setCriteria([...criteria, newCriteria]);
    const newMatrix = [...matrix];
    newMatrix.forEach((row) => row.push(null));
    newMatrix.push(new Array(decisions.length + 1).fill(null));
    setMatrix(newMatrix);
  };

  const removeCriteria = (index) => {
    const newCriteria = [...criteria];
    newCriteria.splice(index, 1);
    setCriteria(newCriteria);
    const newMatrix = [...matrix];
    newMatrix.splice(index, 1);
    newMatrix.forEach((row) => row.splice(index, 1));
    setMatrix(newMatrix);
  };

  const addDecision = () => {
    const newDecision = `Decision ${decisions.length + 1}`;
    setDecisions([...decisions, newDecision]);
    const newMatrix = [...matrix];
    newMatrix.forEach((row) => row.push(null));
    newMatrix.push(new Array(criteria.length + 1).fill(null));
    setMatrix(newMatrix);
  };

  const removeDecision = (index) => {
    const newDecisions = [...decisions];
    newDecisions.splice(index, 1);
    setDecisions(newDecisions);
    const newMatrix = [...matrix];
    newMatrix.splice(index, 1);
    newMatrix.forEach((row) => row.splice(index, 1));
    setMatrix(newMatrix);
  };

  const updateMatrix = (rowIndex, columnIndex, value) => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][columnIndex] = value;
    setMatrix(newMatrix);
  };

  const updateCriteria = (index, name) => {
    const newCriteria = [...criteria];
    newCriteria[index] = name;
    setCriteria(newCriteria);
  };

  const updateDecision = (index, name) => {
    const newDecisions = [...decisions];
    newDecisions[index] = name;
    setDecisions(newDecisions);
  };

  const calculateRowTotal = (row) => {
    return row.reduce((acc, val) => acc + val, 0).toFixed(2);
  };

  const calculateMatrixTotal = () => {
    const rowTotals = matrix.map((row) =>
      row.reduce((acc, val) => acc + val, 0)
    );
    return rowTotals.reduce((acc, val) => acc + val, 0).toFixed(2);
  };

  const LastRow = () => (
    <tr>
      <td>TOTAL</td>
      {criteria.map((_, j) => (
        <td key={j}>{calculateRowTotal(matrix.map((row) => row[j]))}</td>
      ))}
      <td></td>
      <td>{calculateMatrixTotal()}</td>
    </tr>
  );

  return (
    <div>
      <h1 style={{textAlign: "center", padding: "20px"}}>Decision Matrix</h1>
      <Table responsive striped bordered hover align='center' style={{padding: "10px"}}>
        <thead>
          <tr>
            <th></th>
            {criteria.map((c, i) => (
              <th key={i}>
                <input 
                    type="text"
                    value={c}
                    onChange={(e) => updateCriteria(i, e.target.value)}
                />
                <Button variant="outline-danger" onClick={() => removeCriteria(i)}>X</Button>
              </th>
            ))}
            <th>
              <Button variant="outline-success" onClick={addCriteria}>+ Criteria</Button>
            </th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {decisions.map((d, i) => (
            <tr key={i}>
              <td>
                <input 
                    type="text"
                    value={d}
                    onChange={(e) => updateDecision(i, e.target.value)}
                />
                <Button variant="outline-danger" onClick={() => removeDecision(i)}>X</Button>
              </td>
              {criteria.map((c, j) => (
                <td key={j}>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={matrix[i][j]}
                    onChange={(e) =>
                      updateMatrix(i, j, parseInt(e.target.value))
                    }
                  />
                </td>
              ))}
              
              <td>
                
              </td>
              <td>
                {calculateRowTotal(matrix[i])}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
            <LastRow />
            <tr>
                <td>
                    <Button variant="outline-success" onClick={addDecision}>+ Decision</Button>{' '}
                </td>
            </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default App;
