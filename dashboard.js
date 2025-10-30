// Quiz History
function loadQuizHistory() {
  const quizHistory = JSON.parse(localStorage.getItem('scoreHistory')) || [];
  const quizList = document.getElementById('quizHistory');
  quizList.innerHTML = '';
  quizHistory.forEach((score, i) => {
    const li = document.createElement('li');
    li.textContent = `Attempt ${i + 1}: ${score}%`;
    quizList.appendChild(li);
  });
}

// Notes (IndexedDB)
function loadNotes() {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';
  const request = indexedDB.open('notesDB', 1);
  request.onsuccess = event => {
    const db = event.target.result;
    const tx = db.transaction(['notes'], 'readonly');
    const store = tx.objectStore('notes');
    store.openCursor().onsuccess = e => {
      const cursor = e.target.result;
      if (cursor) {
        const li = document.createElement('li');
        li.textContent = cursor.value.content;
        notesList.appendChild(li);
        cursor.continue();
      }
    };
  };
}

// Progress Tracker
function loadProgress() {
  const progress = JSON.parse(localStorage.getItem('progress')) || {};
  const status = document.getElementById('progressStatus');
  const completed = Object.keys(progress).filter(k => progress[k] === true);
  status.textContent = `Modules completed: ${completed.length}`;
}

// Load all
loadQuizHistory();
loadNotes();
loadProgress();