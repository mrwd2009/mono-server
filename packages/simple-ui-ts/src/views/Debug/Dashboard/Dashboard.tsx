import React, { memo, useEffect, useState } from 'react';
import { SearchOutlined, AlertOutlined, WarningOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Card, Button, Form, Radio, Row, Col, Tag, Spin } from 'antd';
import CustomECharts from '../../../components/CustomECharts';
import DateRangePicker from '../../../components/DateRangePicker';
import Panel from '../../../components/Panel';
import useDashboard from './hooks/useDashboard';

let PeriodSelect = ({ className = '', fetchStatistic }: any) => {
  const [type, setType] = useState('fixed'); 
  const [fixedDay, setFixedDay] = useState(1);
  const [dayRange, setDayRange] = useState([null, null]);
  useEffect(() => {
    // get initial value
    fetchStatistic({type, fixedDay, dayRange});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  let select = null;
  if (type === 'fixed') {
    const handleDayChange = (event: any) => {
      const val = event.target.value;
      setFixedDay(val);
      fetchStatistic({
        type,
        fixedDay: val,
        dayRange,
      });
    };
    select = (
      <Form.Item>
        <Radio.Group value={fixedDay} buttonStyle="solid" onChange={handleDayChange}>
          <Radio.Button value={1}>Today</Radio.Button>
          <Radio.Button value={7}>7 days</Radio.Button>
          <Radio.Button value={30}>30 days</Radio.Button>
        </Radio.Group>
      </Form.Item>
    );
  } else if (type === 'range') {
    const handleRangeChange = (val: any) => {
      setDayRange(val);
    };
    select = (
      <Form.Item>
        <div className="dashboard-day-range">
          <DateRangePicker value={dayRange} onChange={handleRangeChange} />
          <Button icon={<SearchOutlined />} onClick={() => fetchStatistic({ type, fixedDay, dayRange })}></Button>
        </div>
      </Form.Item>
    );
  }
  const handleTypeChange = (event: any) => {
    const val = event.target.value;
    setType(val);
    fetchStatistic({ type: val, fixedDay, dayRange })
  };
  return (
    <Form className={`${className}`} layout="inline">
      <Form.Item>
        <Radio.Group value={type} buttonStyle="solid" onChange={handleTypeChange}>
          <Radio.Button value="fixed">Days</Radio.Button>
          <Radio.Button value="range">Range</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {select}
    </Form>
  )
};
PeriodSelect = memo(PeriodSelect) as any;

let StatCard = ({ type, title, value, onClick }: any) => {
  let icon = null;
  let color: any;
  let colorClass: any;
  if (type === 'exception') {
    icon = <AlertOutlined className="text-error" style={{ fontSize: '30px' }} />
    color = 'error';
    colorClass = 'text-error';
  } else if (type === 'warning') {
    icon = <WarningOutlined className="text-warning" style={{ fontSize: '30px' }} />;
    color = 'warning';
    colorClass = 'text-warning';
  } else if (type === 'resolved') {
    icon = <CheckCircleOutlined className="text-success" style={{ fontSize: '30px' }} />;
    color = 'success';
    colorClass = 'text-success';
  } else if (type === 'open') {
    icon = <ClockCircleOutlined className="text-info" style={{ fontSize: '30px' }} />;
    color = 'processing';
    colorClass = 'text-info';
  }

  const cardIcon = (
    <Col flex="none">
      <Button
        shape="circle"
        size="large"
        type="primary"
        style={{ backgroundColor: 'transparent', borderColor: 'transparent', boxShadow: 'none' }}
        onClick={onClick}
      >
        {icon}
      </Button>
    </Col>
  );

  return (
    <Card size="small">
      <Row align="middle" justify="start">
        <Col flex="auto">
          <h5 style={{ fontSize: 36, margin: 0, cursor: 'pointer' }} className={colorClass} onClick={onClick}>
            {value}
          </h5>
          <Tag className="text-uppercase" color={color} onClick={onClick} style={{ cursor: 'pointer' }}>{title}</Tag>
        </Col>
        {cardIcon}
      </Row>
    </Card>
  );
};
StatCard = memo(StatCard) as any;

let EventPerDayChart = ({ dateTitle, dataSource }: any) => {
  const {
    days,
    exception,
    warning,
    resolved,
    open,
  } = dataSource;
  const getSeries = ({name, data}: any): any => {
    return {
      data,
      type: 'bar',
      stack: 'one',
      name,
      barMaxWidth: 60,
      itemStyle: {
        borderRadius: 4,
        borderWidth: 2
      },
    };
  };
  return (
    <Card size="small" title="Events per Day" extra={dateTitle}>
      <CustomECharts
        option={{
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: days,
            axisLine: { onZero: true },
            splitLine: { show: false },
            splitArea: { show: false }
          },
          yAxis: {},
          grid: {
            left: 48,
            right: 24,
            top: 48,
            bottom: 24
          },
          legend: {
            show: true,
            textStyle: {
              fontFamily: 'Roboto',
              color: '#989AA9'
            }
          },
          series: [
            getSeries({ name: 'Exceptions', data: exception}), 
            getSeries({ name: 'Warnings', data: warning }),
            getSeries({ name: 'Resolved', data: resolved }),
            getSeries({ name: 'Open', data: open })
          ]
        }}
        height={420}
      />
    </Card>
  )
};
EventPerDayChart = memo(EventPerDayChart) as any;

let EventPerTypeChart = ({dateTitle, dataSource}: any) => {
  const {
    level,
    type,
  } = dataSource;
  return (
    <Card size="small" title="Exceptions & Warnings by Type" extra={dateTitle}>
      <CustomECharts
        option={{
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: 'Level',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '50%'],
              itemStyle: {
                borderRadius: 4,
                borderWidth: 2
              },
              label: {
                position: 'inner',
                fontSize: 11,
                fontWeight: 'bold'
              },
              labelLine: {
                show: false
              },
              data: level
            },
            {
              name: 'Type',
              type: 'pie',
              radius: ['70%', '85%'],
              itemStyle: {
                borderRadius: 4,
                borderWidth: 2
              },
              label: {
                formatter: '{b|{b}：}{c}\n   {per|{d}%}  ',
                borderRadius: 4,
                padding: [2, 4],
                rich: {
                  b: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    lineHeight: 33
                  },
                  c: {
                    padding: [3, 4],
                    borderRadius: 4
                  },
                  per: {
                    padding: [3, 4],
                    borderRadius: 4
                  }
                }
              },
              data: type
            }
          ]
        }}
        height={420}
      />
    </Card>
  );
};
EventPerTypeChart = memo(EventPerTypeChart) as any;

const Dashboard = () => {
  const {
    loading,
    type,
    fixedDay,
    dayRange,
    statistic,
    fetchStatistic,
  } = useDashboard();
  let statEle = null;
  if (statistic) {
    const cardCol = {
      xs: 24,
      md: 12,
      xl: 6,
    };
    const chartCol = {
      xs: 24,
      md: 24,
      xl: 12,
    };
    const gutter: any = [16, 16];
    const {
      exception,
      warning,
      resolved,
      open,
      perDay,
      perType,
    } = statistic;
    let dateTitle = '';
    if (type === 'fixed') {
      dateTitle = `Last ${fixedDay} days`;
    } else if (type === 'range') {
      const f = 'YYYY-MM-DD';
      if (dayRange[0]) {
        if (dayRange[1]) {
          dateTitle = `Between ${dayRange[0].format(f)} and ${dayRange[1].format(f)}`;
        } else {
          dateTitle = `After ${dayRange[0].format(f)}`;
        }
      } else {
        if (dayRange[1]) {
          dateTitle = `Before ${dayRange[1].format(f)}`;
        }
      }
    }
    statEle = (
      <>
        <Row gutter={gutter} className="mb-4">
          <Col {...cardCol}>
            <StatCard type="exception" value={exception} title="Exceptions" />
          </Col>
          <Col {...cardCol}>
            <StatCard type="warning" value={warning} title="Warnings" />
          </Col>
          <Col {...cardCol}>
            <StatCard type="resolved" value={resolved} title="Resolved" />
          </Col>
          <Col {...cardCol}>
            <StatCard type="open" value={open} title="Open" />
          </Col>
        </Row>
        <Row gutter={gutter}>
          <Col {...chartCol}>
            <EventPerDayChart dateTitle={dateTitle} dataSource={perDay} />
          </Col>
          <Col {...chartCol}>
            <EventPerTypeChart dateTitle={dateTitle} dataSource={perType} />
          </Col>
        </Row>
      </>
    );
  }
  return (
    <Panel>
      <Spin spinning={loading}>
      <PeriodSelect className="mb-4" fetchStatistic={fetchStatistic} />
        {statEle}
      </Spin>
    </Panel>
  );
};

export default memo(Dashboard);