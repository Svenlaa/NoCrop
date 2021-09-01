const prefs = {
  noLimit: 0,
  maxHeight: 0.7,
  updateSpeed: 200,
  logs: 1
};

const script = document.createElement('script');
chrome.storage.local.get(prefs, prefs => {
  Object.assign(script.dataset, prefs);
  script.src = chrome.runtime.getURL('/data/code.js');
  script.onload = () => script.remove();
  (document.head).appendChild(script);
});

chrome.storage.onChanged.addListener(prefs => {
  Object.entries(prefs).forEach(([key, value]) => script.dataset[key] = value.newValue);
});