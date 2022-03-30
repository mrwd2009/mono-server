const theme = {
  color: [
    '#80bc00',
    '#759aa0',
    '#e69d87',
    '#8dc1a9',
    '#ea7e53',
    '#eedd78',
    '#73a373',
    '#73b9bc',
    '#7289ab',
    '#91ca8c',
    '#f49f42',
  ],
  backgroundColor: '#ffffff',
  textStyle: {},
  title: {
    textStyle: {
      color: 'rgba(0,0,0,0.85)',
    },
    subtextStyle: {
      color: 'rgba(0,0,0,0.45)',
    },
  },
  line: {
    itemStyle: {
      borderWidth: '2',
    },
    lineStyle: {
      width: '3',
    },
    symbolSize: '8',
    symbol: 'emptyCircle',
    smooth: false,
  },
  radar: {
    itemStyle: {
      borderWidth: '2',
    },
    lineStyle: {
      width: '3',
    },
    symbolSize: '8',
    symbol: 'emptyCircle',
    smooth: false,
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: '#f0f0f0',
    },
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#f0f0f0',
    },
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#f0f0f0',
    },
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#f0f0f0',
    },
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#f0f0f0',
    },
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#f0f0f0',
    },
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#f0f0f0',
    },
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#f0f0f0',
    },
  },
  candlestick: {
    itemStyle: {
      color: '#d0648a',
      color0: 'transparent',
      borderColor: '#d0648a',
      borderColor0: '#22c3aa',
      borderWidth: '1',
    },
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#f0f0f0',
    },
    lineStyle: {
      width: '1',
      color: '#cccccc',
    },
    symbolSize: '8',
    symbol: 'emptyCircle',
    smooth: false,
    color: [
      '#80bc00',
      '#759aa0',
      '#e69d87',
      '#8dc1a9',
      '#ea7e53',
      '#eedd78',
      '#73a373',
      '#73b9bc',
      '#7289ab',
      '#91ca8c',
      '#f49f42',
    ],
    label: {
      color: '#ffffff',
    },
  },
  map: {
    itemStyle: {
      areaColor: '#eeeeee',
      borderColor: '#999999',
      borderWidth: 0.5,
    },
    label: {
      color: '#28544e',
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(34,195,170,0.25)',
        borderColor: '#22c3aa',
        borderWidth: 1,
      },
      label: {
        color: '#349e8e',
      },
    },
  },
  geo: {
    itemStyle: {
      areaColor: '#eeeeee',
      borderColor: '#999999',
      borderWidth: 0.5,
    },
    label: {
      color: '#28544e',
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(34,195,170,0.25)',
        borderColor: '#22c3aa',
        borderWidth: 1,
      },
      label: {
        color: '#349e8e',
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: '#999999',
    },
    emphasis: {
      iconStyle: {
        borderColor: '#666666',
      },
    },
  },
  legend: {
    textStyle: {
      color: '#999999',
    },
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#cccccc',
        width: 1,
      },
      crossStyle: {
        color: '#cccccc',
        width: 1,
      },
    },
  },
  timeline: {
    lineStyle: {
      color: '#4ea397',
      width: 1,
    },
    itemStyle: {
      color: '#4ea397',
      borderWidth: 1,
    },
    controlStyle: {
      color: '#4ea397',
      borderColor: '#4ea397',
      borderWidth: 0.5,
    },
    checkpointStyle: {
      color: '#4ea397',
      borderColor: '#3cebd2',
    },
    label: {
      color: '#4ea397',
    },
    emphasis: {
      itemStyle: {
        color: '#4ea397',
      },
      controlStyle: {
        color: '#4ea397',
        borderColor: '#4ea397',
        borderWidth: 0.5,
      },
      label: {
        color: '#4ea397',
      },
    },
  },
  visualMap: {
    color: ['#d0648a', '#22c3aa', '#adfff1'],
  },
  dataZoom: {
    backgroundColor: 'rgba(255,255,255,0)',
    dataBackgroundColor: 'rgba(222,222,222,1)',
    fillerColor: 'rgba(114,230,212,0.25)',
    handleColor: '#cccccc',
    handleSize: '100%',
    textStyle: {
      color: '#999999',
    },
  },
  markPoint: {
    label: {
      color: '#ffffff',
    },
    emphasis: {
      label: {
        color: '#ffffff',
      },
    },
  },
};

export default theme;
