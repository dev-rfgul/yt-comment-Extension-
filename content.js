chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  if (message.data == "openUrl") {
    console.log("start from content.js"+ message.message);
    startProcess();
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'performActions') {
    // Perform your actions here
    startProcess();
  }
});

async function startProcess() {
  // await createTab();
  await likeVideo();
  await subscribeChannel();
  await commentVideo();
  await closeTab();
}
async function likeVideo() {
  // Wait for the DOM content to be fully loaded

  await sleep(5000);

  const buttonViewModel = document.querySelector("button-view-model");

  if (buttonViewModel) {
    const likeButton = buttonViewModel.querySelector("button");

    if (likeButton) {
      likeButton.click();
    } else {
      console.error("Like button not found within button-view-model");
    }
  } else {
    console.error("button-view-model element not found");
  }
}
async function subscribeChannel() {
  let subscribeButton = document.querySelector(
    "#subscribe-button-shape > button"
  );
  subscribeButton.click();
  // Implementation goes here
}
async function commentVideo() {
  var placeholder = document.getElementById("placeholder-area");
  if (placeholder) {
    placeholder.focus();
    placeholder.click();
    document.execCommand("insertText", true, "comment function executed");
  } else {
    console.log("not found");
  }

  // click on subscribe btn
  var button = document.getElementById("submit-button");
  if (button) {
    button.click();
  } else {
    console.log("Button with ID 'submit-button' not found.");
  }
}
async function closeTab() {
  // Close the current tab
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.tabs.remove(tabs[0].id);
  });
}
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function getURLsArray() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("URLsArray", function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.URLsArray || []);
        console.log("URLsArray is set to " + result.URLsArray);
      }
    });
  });
}