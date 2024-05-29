const addForm = document.getElementById('add-character-form');
const updateForm = document.getElementById('update-character-form');
const deleteForm = document.getElementById('delete-character-form');
const searchForm = document.querySelector('.search-form');

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

