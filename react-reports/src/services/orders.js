// Synthetic data only. Replace this boundary with the reporting API client later.
export const orders = [
  {id:1001,date:'2026-10-01',customer:'Sample Oak Homes',address:'101 Sample Lane',crew:'A',amount:650},
  {id:1002,date:'2026-10-01',customer:'Demo Title Company',address:'202 Example Drive',crew:'B',amount:850},
  {id:1003,date:'2026-10-02',customer:'Sample Oak Homes',address:'303 Sample Court',crew:'A',amount:450},
  {id:1004,date:'2026-10-02',customer:'Example Builders',address:'404 Demo Street',crew:'C',amount:1200},
  {id:1005,date:'2026-10-02',customer:'Demo Title Company',address:'505 Example Road',crew:'B',amount:700},
  {id:1006,date:'2026-10-03',customer:'Example Builders',address:'606 Sample Avenue',crew:'C',amount:950}
];
export function filterOrders(data, from, to) {
  return data.filter(row => (!from || row.date >= from) && (!to || row.date <= to)).sort((a,b)=>a.id-b.id);
}
export function countByDay(data) {
  const counts = new Map();
  for (const row of data) counts.set(row.date,(counts.get(row.date)||0)+1);
  return [...counts].sort(([a],[b])=>a.localeCompare(b)).map(([date,count])=>({date,count}));
}
