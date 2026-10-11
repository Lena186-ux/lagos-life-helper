const form=document.querySelector('#budget-form');
const ids=['pay','shifts','rent','loan','costs','reserve','cash','move'];
const number=new Intl.NumberFormat('en-NG',{maximumFractionDigits:2});
const money=v=>`${v<0?'−':''}₦${number.format(Math.abs(v))}`;
const put=(id,v)=>{document.getElementById(id).textContent=v};
const hide=()=>{document.querySelector('#results').classList.add('hidden');document.querySelector('#empty-result').classList.remove('hidden')};
form.addEventListener('input',()=>{hide();put('form-error','')});
form.addEventListener('reset',()=>{hide();put('form-error','')});
form.addEventListener('submit',e=>{
 e.preventDefault();const vals={};
 for(const id of ids){const input=document.getElementById(id),v=Number(input.value);if(input.value.trim()===''||!Number.isFinite(v)||v<0||v>1e12||(id==='shifts'&&!Number.isInteger(v))){hide();put('form-error','Enter valid non-negative amounts and a whole number of shifts.');input.focus();return}vals[id]=v;}
 const income=vals.pay*vals.shifts,bills=vals.rent+vals.loan+vals.costs,target=bills+vals.reserve,surplus=income-target,remaining=vals.cash-vals.move;
 if(!Number.isSafeInteger(Math.ceil(income))){hide();put('form-error','That income is too large to calculate reliably. Reduce the inputs.');return}
 put('income',money(income));put('bills',money(bills));put('reserve-result',money(vals.reserve));put('surplus',money(surplus));
 put('rent-share',income>0?`${number.format(vals.rent/income*100)}%`:'Undefined (no income)');
 const shifts=target===0?0:vals.pay>0?Math.ceil(target/vals.pay):null;
 put('break-even',shifts===null?'Not possible at zero pay':number.format(shifts));put('after-move',money(remaining));
 put('status',surplus>0?'This plan leaves a weekly surplus after your reserve.':surplus===0?'This plan breaks even with no spare income beyond your reserve.':`This plan is short by ${money(-surplus)} per week. Recheck spending or attainable shifts.`);
 put('cash-status',remaining<0?`Immediate costs exceed your cash by ${money(-remaining)}. Future weekly income does not cover a bill due now.`:'This is cash left immediately after the costs you entered. Future shift income is not added.');
 document.querySelector('#empty-result').classList.add('hidden');document.querySelector('#results').classList.remove('hidden');put('form-error','');
});
