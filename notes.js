let db;
const request = indexedDB.open('notesDB', 1);

request.onupgradeneeded = event => {
  const db = event.target.result;
  db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
};

request.onsuccess = event => {
  db = event.target.result;
  loadNotes();
};

function saveNote() {
  const noteInput = document.getElementById('noteInput');
  const transaction = db.transaction(['notes'], 'readwrite');
  const store = transaction.objectStore('notes');
  store.add({ content: noteInput.value });
  noteInput.value = '';
  loadNotes();
}

function loadNotes() {
  const noteList = document.getElementById('noteList');
  noteList.innerHTML = '';
  const transaction = db.transaction(['notes'], 'readonly');
  const store = transaction.objectStore('notes');
  store.openCursor().onsuccess = event => {
    const cursor = event.target.result;
    if(cursor) {
      const listItem = document.createElement('li');
      listItem.textContent = cursor.value.content;
      noteList.appendChild(listItem);
      cursor.continue();
    }
  };
}