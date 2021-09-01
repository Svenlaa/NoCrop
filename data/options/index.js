const toast = document.getElementById('toast');

function restore() {
  chrome.storage.local.get({
    logs: true,
    noLimit: false,
    maxHeight: 0.7,
    updateSpeed: 200
  }, prefs => {
    console.log(prefs);
    document.getElementById('logs').checked = prefs.logs;
    document.getElementById('noLimit').checked = prefs.noLimit;
    document.getElementById('maxHeight').value = prefs.maxHeight;
    document.getElementById('updateSpeed').value = prefs.updateSpeed;
  });
}

function save() {
  const logs = document.getElementById('logs').checked;
  const noLimit = document.getElementById('noLimit').checked;
  const maxHeight = document.getElementById('maxHeight').value;
  const updateSpeed = document.getElementById('updateSpeed').value;

  chrome.storage.local.set({
    logs,
    noLimit,
    maxHeight,
    updateSpeed,
  }, () => {
    toast.textContent = 'Options saved.';
    setTimeout(() => toast.textContent = '', 750);
  });
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);

document.getElementById('reset').addEventListener('click', e => {
  if (e.detail === 1) {
    toast.textContent = 'Double-click to reset!';
    setTimeout(() => toast.textContent = '', 750);
  }
  else {
    localStorage.clear();
    chrome.storage.local.clear(() => {
      chrome.runtime.reload();
      window.close();
    });
  }
});

document.getElementById('support').addEventListener('click', () => chrome.tabs.create({
  url: chrome.runtime.getManifest().homepage_url + '/donate'
}));


