import React from 'react';
import Plot from 'react-plotly.js';
import { Layout } from 'plotly.js';

import './App.scss';

const xValues = Array.from({ length: 30 }, (_, idx) => idx * 20 + 10);
const yBlockNew = [
  37, 70, 45, 59, 59, 71,
  77, 79, 105, 155, 132, 120,
  133, 149, 153, 209
];
const yBlockOld = [
  336, 1821, 4249,
  7939, 12689, 19769,
  29386, 36943, 51048,
  60506, 70294, 90289,
  106059, 129627, 145296,
  174207
];
const yReceiptNew = [
  4, 2, 2, 2, 3, 3,
  3, 3, 3, 3, 4, 3,
  3, 4, 3, 4
];
const yReceiptOld = [
  29, 53, 77, 208, 119,
  300, 188, 436, 236, 272,
  529, 313, 774, 702, 794,
  905
];
const boostBlockInNumber = yBlockOld.map((x, i) => Math.ceil(x / yBlockNew[i]))
const boostReceiptInNumber = yReceiptOld.map((x, i) => Math.ceil(x / yReceiptNew[i]))
const boostBlock = yBlockOld.map((x, i) => `  ${boostBlockInNumber[i]}x boost ⚡`)
const boostReceipt = yReceiptOld.map((x, i) => `  ${boostReceiptInNumber[i]}x boost ⚡`)

const layout1: Partial<Layout> = {
  barmode: 'stack',
  xaxis: {
    tickvals: xValues,
    
    title: 'block complexity (tx count)',
    titlefont: {
      size: 28,
      // color: 'rgb(107, 107, 107)'
    },
    tickfont: {
      size: 16,
      // color: 'rgb(107, 107, 107)'
    },
    // position: 0.5,
    // autorange: true,
    // autotick: true,
    // type: 'log',
    // autorange: true,
  },
  yaxis: {
    title: 'performance (ms) in log scale',
    type: 'log',
    titlefont: {
      size: 28,
      // color: 'rgb(107, 107, 107)'
    },
    tickfont: {
      size: 16,
      // color: 'rgb(107, 107, 107)'
    }
    // autorange: true,
  },
  legend: {
    x: 0.03,
    y: 0.95,
    font: {
      size: 30,
    }
  },
  bargroupgap: 0.1,
  title: '<getBlock> RPC Performance V.S. Block Complexity',
  font: {
    size: 30
  }
};

const layout2: Partial<Layout> = {
  ...layout1,
  title: '<getReceipt> RPC Performance V.S. Block Complexity',
  // yaxis: {
  //   ...layout1.yaxis,
  //   title: 'performance (ms) in liner scale',
  //   type: 'linear',
  // }
}

const App = () => {
  return (
    <div id='app'>
      <Plot
        data={ [
          {
            name: 'new rpc',
            x: xValues,
            y: yBlockNew,
            type: 'bar',
            
            // mode: 'text+lines',
            marker: { color: '#00ffd2aa' },
          },
          {
            name: 'old rpc',
            x: xValues,
            y: yBlockOld,
            type: 'bar',
            text: boostBlock,
            // mode: 'text+lines',
            marker: { color: '#ff6c00aa' },
          },
          {
            name: 'boost (how many times faster)',
            x: xValues,
            y: boostBlockInNumber,
            type: 'scatter',
            // mode: 'text+lines',
            line: { color: '#0600ff', width: 3 },
          },
        ] }
        layout={ layout1 }
        style={{
          marginTop: '50px',
          display: 'flex',
          height: '80vh',
          width: '80vw',
        }}
      />

      <hr style={{
        borderTop: '10px solid #aaaaaa',
        display: 'flex',
        width: '50vw',
        marginTop: 150,
      }} />

      <Plot
        data={ [
          {
            name: 'new rpc',
            x: xValues,
            y: yReceiptNew,
            type: 'bar',
            
            // mode: 'text+lines',
            marker: { color: '#00ffd2aa' },
          },
          {
            name: 'old rpc',
            x: xValues,
            y: yReceiptOld,
            type: 'bar',
            text: boostReceipt,
            // mode: 'text+lines',
            marker: { color: '#ff6c00aa' },
          },
          {
            name: 'boost (how many times faster)',
            x: xValues,
            y: boostReceiptInNumber,
            type: 'scatter',
            // mode: 'text+lines',
            line: { color: '#0600ff', width: 3 },
          },
        ] }
        layout={ layout2 }
        style={{
          marginTop: '150px',
          marginBottom: '200px',
          display: 'flex',
          height: '80vh',
          width: '80vw',
        }}
      />
    </div>
  );
};

export default App;
