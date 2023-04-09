const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

$('.grocery-form').addEventListener('click', addItem);
$('.clear-btn').addEventListener('click', clearItems);
$(window).addEventListener('DOMContentLoaded', setupItems);

const addItem = (e) => {
  e.preventDefault();
  const value = $('#grocery').value
  const id = parseInt(Math.random * 1000000)
  console.log(value);
  console.log('clicked')
} 

console.log('addItem')
