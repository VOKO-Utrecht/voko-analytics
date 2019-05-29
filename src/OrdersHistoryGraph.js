import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
} from 'recharts';
import dayjs from 'dayjs';
import { blueGrey, teal } from '@material-ui/core/colors';
import * as formatters from './formatters.js';

const renderYearTick = tickProps => {
  const { x, y, payload } = tickProps;
  const { value, offset } = payload;
  const date = dayjs(value);
  const label = date.format('YYYY');
  const month = date.month();

  if (month === 6) {
    return (
      <text x={x + offset} y={y - 4} textAnchor="middle">
        {label}
      </text>
    );
  }

  //   const isLast = month === 11;

  if (month === 0) {
    const pathX = Math.floor(x) + 0.5;

    return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
  }
  return null;
};

function OrdersHistoryGraph({ data, fields }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
        <XAxis
          dataKey="open_for_orders_date"
          tickFormatter={formatters.month}
        />
        <XAxis
          dataKey="open_for_orders_date"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={renderYearTick}
          //   tickFormatter={formatters.year}
          //   height={1}
          //   scale="band"
          xAxisId="year"
          //   allowDuplicatedCategory={false}
        />

        <YAxis />
        <CartesianGrid strokeDasharray="3 5" />
        <Tooltip
          labelFormatter={formatters.longDate}
          animationEasing="ease-out"
          animationDuration={300}
        />
        <Legend />
        {Object.entries(fields).map(
          ([key, field]) =>
            field.visible && (
              <Line
                name={field.label}
                type="monotone"
                dataKey={key}
                stroke={field.color}
                key={key}
                animationDuration={300}
                dot={false}
              />
            )
        )}
        {/* Annotations. Note: Pick a x value that already exists */}
        <ReferenceLine
          x="2018-12-09"
          stroke={teal[500]}
          strokeDasharray="3 3"
          label="Nieuwe website"
        />
        <Brush
          dataKey="open_for_orders_date"
          height={30}
          stroke={blueGrey[500]}
          tickFormatter={formatters.shortDate}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default OrdersHistoryGraph;
