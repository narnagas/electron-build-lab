import {test} from 'node:test';
import assert from 'node:assert/strict';
import {filterOrders,countByDay} from './orders.js';
test('date range includes boundaries and sorts by job ID',()=>{
 const data=[{id:3,date:'2026-10-03'},{id:2,date:'2026-10-02'},{id:1,date:'2026-10-01'}];
 assert.deepEqual(filterOrders(data,'2026-10-01','2026-10-02').map(r=>r.id),[1,2]);
 assert.equal(data[0].id,3);
});
test('chart counts orders per date rather than order value',()=>{
 assert.deepEqual(countByDay([{date:'2026-10-02'},{date:'2026-10-01'},{date:'2026-10-02'}]),[{date:'2026-10-01',count:1},{date:'2026-10-02',count:2}]);
 assert.deepEqual(countByDay([]),[]);
});
