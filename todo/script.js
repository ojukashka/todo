const addbtn = document.querySelector('#add');
const todolists = document.querySelector('.lists');

window.addEventListener('load', getTodo);
addbtn.addEventListener('click', addfun);

function addfun() {
  const lists = document.createElement('li');
  const todoin = document.querySelector('#todoin');
  todolists.appendChild(lists);
  const check = document.createElement('input');
  check.type = 'checkbox';
  lists.appendChild(check);
  const task = document.createElement('p');
  lists.appendChild(task);
  lists.className = 'text';
  task.innerText = todoin.value;
  const edit = document.createElement('button');
  lists.appendChild(edit);
  edit.innerText = 'edit';
  edit.className = 'edit';
  const del = document.createElement('button');
  del.innerText = 'delete';
  del.className = 'delete';
  lists.appendChild(del);
  savelocalstorage(todoin.value);
  todoin.value = '';
}

todolists.addEventListener('click', ustgah);
todolists.addEventListener('click', edit);
todolists.addEventListener('click', check);

function ustgah(event) {
  let targetel = event.target;
  if (targetel.className == 'delete') {
    let parenttarget = event.path[1];
    let task = parenttarget.querySelector('p');
    let getElement = localStorage.getItem('todo');
    let arrayElement = getElement.split(',');
    let findel = arrayElement.findIndex((el) => {
      return el == task.innerText;
    });
    arrayElement.splice(findel, 1);
    localStorage.setItem('todo', arrayElement.toString());
    parenttarget.remove();
  } else {
    return;
  }
}

function savelocalstorage(todo) {
  if (localStorage.getItem('todo') == null) {
    localStorage.setItem('todo', todo);
  } else {
    localStorage.setItem(
      'todo',
      localStorage.getItem('todo', todo) + ',' + todo
    );
  }
}

function getTodo() {
  let getElement = localStorage.getItem('todo');
  let arrayElement = getElement.split(',');
  arrayElement.forEach((el) => {
    const lists = document.createElement('li');
    const todoin = document.querySelector('#todoin');
    todolists.appendChild(lists);
    const task = document.createElement('p');
    const check = document.createElement('input');
    check.type = 'checkbox';
    lists.appendChild(check);
    lists.appendChild(task);
    lists.className = 'text';
    task.innerText = el;
    const edit = document.createElement('button');
    lists.appendChild(edit);
    edit.innerText = 'edit';
    edit.className = 'edit';
    const del = document.createElement('button');
    del.innerText = 'delete';
    del.className = 'delete';
    lists.appendChild(del);
  });
}

let d = 0;
function edit(e) {
  let targetedit = e.target;
  let parenttarget = e.path[1];
  if (targetedit.className == 'edit') {
    let getElement = localStorage.getItem('todo');
    let arrayElement = getElement.split(',');
    let task = parenttarget.querySelector('p');
    let findel = arrayElement.findIndex((el) => {
      return el == task.innerText;
    });
    if (d == 0) {
      const inputel = document.createElement('input');
      inputel.type = 'text';
      parenttarget.appendChild(inputel);
      targetedit.innerText = 'done';
      d = d + 1;
    } else if (d == 1) {
      targetedit.innerText = 'edit';
      const inputel = parenttarget.children[4];
      task.innerText = inputel.value;
      inputel.remove();
      arrayElement.splice(findel, 1, inputel.value);
      console.log(arrayElement);
      localStorage.setItem('todo', arrayElement.toString());
      d = d - 1;
    }
  }
}

function check(event) {
  let target = event.target;
  let parenttarget = event.path[1];
  let child = parenttarget.children[1];
  if (target.type == 'checkbox') {
    if (target.checked == true) {
      child.className = 'check';
    } else {
      child.className = 'text';
    }
  }
}
