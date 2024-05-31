const addForm = document.querySelector('.add-entity-form');
const updateForm = document.querySelector('.update-entity-form');
const searchForm = document.querySelector('.search-form');

console.log(addForm);
console.log(updateForm);
console.log(searchForm);

const showAddForm = () => {
  list = addForm.classList;
  if (list.contains('hidden')) {
    list.toggle('hidden');
  }
};

const showUpdateForm = () => {
  list = updateForm.classList;
  if (list.contains('hidden')) {
    list.toggle('hidden');
  }
};

const showDeleteForm = () => {
  list = deleteForm.classList;
  if (list.contains('hidden')) {
    list.toggle('hidden');
  }
};

const showSearchForm = () => {
  list = searchForm.classList;
  if (list.contains('hidden')) {
    list.toggle('hidden');
  }
};

const toggleAddForm = () => {
  list = addForm.classList;
  list.toggle('hidden');
};

const toggleSearchForm = () => {
  list = searchForm.classList;
  list.toggle('hidden');
};

const toggleUpdateForm = () => {
  list = updateForm.classList;
  list.toggle('hidden');
};

const toggleDeleteForm = () => {
  list = deleteForm.classList;
  list.toggle('hidden');
};

