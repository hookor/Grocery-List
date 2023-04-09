//DOM manipulation by bind function
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

$('.grocery-form').addEventListener('click', addItem);
// $('.clear-btn').addEventListener('click', clearItems);
// $(window).addEventListener('DOMContentLoaded', setupItems);

//edit option variables
let editEl;
let onEdit = false;
let editID = '';

function addItem(e) {
  e.preventDefault();
  const value = $('#grocery').value;
  const id = parseInt(Math.random() * 1000000);
  //CONDITIONS OF if/else if
  const generalInput = value !== '' && !onEdit;
  const editInput = value !== '' && onEdit;
  const todo = `<p class="title">${value}</p>
<div class="btn-container">
  <button type="button" class="edit-btn">
    <div class="material-symbols-outlined">add_shopping_cart</div>
  </button>
  <button type="button" class="delete-btn">
    <div class="material-symbols-outlined">
      remove_shopping_cart
    </div>
  </button>
</div>`;

  if (generalInput) {
    //generate todo
    const element = document.createElement('article');
    let attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add('grocery-list__item');
    element.innerHTML = todo;
    //eventlisteners on delete/edit btns
    $('.delete-btn').addEventListener('click', deleteItem);
    $('.edit-btn').addEventListener('click', editItem);
    $('.grocery-list').appendChild(element);
    displayAlert('Listed', 'success');
    $('.grocery-container').classList.add('show-container');
    addToLocalStorage(id, value);
    Initialise();
  } else if (editInput) {
    editEl.innerHTML = value;
    displayAlert('Updated', 'success');
    editLocalStorage(editID, value);
    Initialise();
  } else {
    displayAlert('Input is required', 'danger');
  }
}

function displayAlert(text, action) {
  $('.alert').textContent = text;
  $('.alert').classList.add(`alert-${action}`);
  setTimeout(function () {
    $('.alert').textContent = '';
    $('.alert').classList.remove(`alert-${action}`);
  }, 1000);
}

function clearItems() {
  if ($$('.grocery-list__item').length > 0) {
    $$('.grocery-list__item').forEach(function (todo) {
      $('.grocery-list').removeChild(todo);
    });
  }
  $('.grocery-container').classList.remove('show-container');
  displayAlert('Cleared', 'danger');
  Initialise();
  localStorage.removeItem($$('.grocery-list__item'));
}

function deleteItem(e) {
  const el = e.currentTarget.parentElement.parentElement;
  const id = el.dataset.id;

  $('.grocery-list').removeChild(el);

  if ($('.grocery-list').children.length === 0) {
    $('.grocery-container').classList.remove('show-container');
  }
  displayAlert('Removed', 'danger');

  Initialise();
  removeFromLocalStorage(id);
}

function editItem(e) {
  const el = e.currentTarget.parentElement.parentElement;
  editEl = e.currentTarget.parentElement.previousElementSibling;
  $('#grocery').value = editEl.innerHTML;
  onEdit = true;
  editID = el.dataset.id;
  $('.submit-btn').textContent = 'Edit';
}

function Initialise() {
  $('#grocery').value = '';
  onEdit = false;
  editID = '';
  $('.submit-btn').textContent = 'Submit';
}

function addToLocalStorage(id, value) {
  $('#grocery') = { id, value };
  let items = getLocalStorage();
  items.push($('#grocery'));
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}