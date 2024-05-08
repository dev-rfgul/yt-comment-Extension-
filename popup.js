document.getElementById("startBtn").addEventListener("click", function () {
  chrome.tabs.query(
    { currentWindow: true, active: true },
    async function (tabs) {
      await startProcess();
      chrome.tabs.sendMessage(tabs[0].id, { message: "startProcess" });
    }
  );
});

async function startProcess() {
  await createTab();
  await likeVideo();
  await subscribeChannel();
  await commentVideo();
  await closeTab();
}

async function createTab() {
  const URL = document.getElementById("input").value;
  let URLsArray = URL.split("\n");

  for (let i = 0; i < URLsArray.length; i++) {
    console.log(URLsArray[i]);

    await new Promise((resolve) => {
      chrome.tabs.create({ url: URLsArray[i], active: true }, function (tab) {
        // Activate the tab once it's created
        chrome.tabs.update(tab.id, { active: true }, () => {
          resolve(); // Resolve the promise when tab is activated
        });
      });
    });

    await likeVideo(); // Wait for like action to complete
  }
}

async function likeVideo() {
  // Wait for the DOM content to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
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
  });
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
