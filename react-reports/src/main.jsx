import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {PDFDownloadLink,PDFViewer} from '@react-pdf/renderer';
import {orders,filterOrders,countByDay} from './services/orders.js';
import {OrdersChart} from './charts/OrdersChart.jsx';
import {DailyOrdersPdf} from './reports/DailyOrdersPdf.jsx';
import './styles/app.css';
function App(){
 const [from,setFrom]=useState('2026-10-01'),[to,setTo]=useState('2026-10-03'),[preview,setPreview]=useState(false);
 const invalid=!!(from&&to&&from>to);
 const rows=invalid?[]:filterOrders(orders,from,to);
 const total=rows.reduce((sum,r)=>sum+r.amount,0);
 const document=<DailyOrdersPdf rows={rows} from={from} to={to}/>;
 return <main><header><span className="eyebrow">ELECTRON BUILD LAB / REACT POC</span><h1>Daily Orders</h1><p>Explore report data, graphics, and PDF output.</p><span className="badge">Sample data · No live API connection</span></header><section className="panel filters"><label>From<input type="date" value={from} onChange={e=>setFrom(e.target.value)}/></label><label>To<input type="date" value={to} onChange={e=>setTo(e.target.value)}/></label><button onClick={()=>{setFrom('2026-10-01');setTo('2026-10-03')}}>Reset</button><button disabled={invalid} onClick={()=>setPreview(!preview)}>{preview?'Hide PDF':'Preview PDF'}</button>{!invalid&&<PDFDownloadLink className="primary" document={document} fileName="daily-orders-sample.pdf">{({loading,error})=>error?'PDF unavailable':loading?'Preparing PDF…':'Download PDF'}</PDFDownloadLink>}</section>{invalid&&<p role="alert" className="error">The From date must be on or before the To date.</p>}<div className="metrics"><section className="panel"><span>Orders</span><strong>{rows.length}</strong></section><section className="panel"><span>Order value</span><strong>{total.toLocaleString('en-US',{style:'currency',currency:'USD'})}</strong></section><section className="panel"><span>Customers</span><strong>{new Set(rows.map(r=>r.customer)).size}</strong></section></div><section className="panel"><h2>Orders by day</h2>{rows.length?<OrdersChart data={countByDay(rows)}/>:<p>No orders in this range.</p>}</section><section className="panel"><h2>Order details</h2><div className="table-scroll"><table><thead><tr>{['Job','Date','Customer','Address','Crew','Amount'].map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{r.id}</td><td>{r.date}</td><td>{r.customer}</td><td>{r.address}</td><td>{r.crew}</td><td>{r.amount.toLocaleString('en-US',{style:'currency',currency:'USD'})}</td></tr>)}</tbody></table>{!rows.length&&<p>No orders in this range.</p>}</div></section>{preview&&!invalid&&<section className="panel"><h2>PDF preview</h2><PDFViewer width="100%" height={650} title="Daily Orders PDF preview">{document}</PDFViewer></section>}<footer>Reporting Lab · React UI → reporting service → existing APIs (planned)</footer></main>;
}
createRoot(document.getElementById('root')).render(<App/>);
