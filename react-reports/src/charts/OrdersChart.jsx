import React from 'react';
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip} from 'recharts';
export function OrdersChart({data}) {
 return <div className="chart" role="img" aria-label={data.map(d=>`${d.date}: ${d.count} orders`).join('; ')}><ResponsiveContainer width="100%" height={260}><BarChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="date"/><YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="count" name="Orders" fill="#2563eb" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div>;
}
