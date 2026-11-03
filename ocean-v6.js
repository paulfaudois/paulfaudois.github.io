// V6 : simple monthly filtering. Works without a JavaScript framework.
document.addEventListener('DOMContentLoaded',()=>{
 const buttons=[...document.querySelectorAll('.watch-filter-btn')];
 const entries=[...document.querySelectorAll('.watch-entry')];
 buttons.forEach(button=>button.addEventListener('click',()=>{
   const month=button.dataset.filter;
   buttons.forEach(other=>{const selected=other===button;other.classList.toggle('active',selected);other.setAttribute('aria-pressed',String(selected));});
   entries.forEach(item=>{item.hidden=month!=='tous' && item.dataset.month!==month;});
   const empty=document.querySelector('.watch-no-result');
   if(empty)empty.hidden=entries.some(item=>!item.hidden);
 }));
});
