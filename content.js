chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.action === "performActions") {
    try {
      await startProcess();
      sendResponse({ status: "completed" });
    } catch (error) {
      console.error("Error:", error);
      sendResponse({ status: "failed", error: error.message });
    }
    // Will respond asynchronously
  }
});

async function startProcess() {
  await likeVideo();
  await subscribeChannel();
  await commentVideo();

}

async function likeVideo() {
  await sleep(5000);
  const buttonViewModel = document.querySelector("button-view-model");
  if (buttonViewModel) {
    const likeButton = buttonViewModel.querySelector("button");
    if (likeButton) {
      likeButton.click();
    } else {
      throw new Error("Like button not found within button-view-model");
    }
  } else {
    throw new Error("button-view-model element not found");
  }
}

async function subscribeChannel() {
  window.scrollBy(0, 100);
  console.log("Scrolled");
  const subscribeButton = document.querySelector(
    "#subscribe-button-shape > button"
  );
  if (subscribeButton) {
    subscribeButton.click();
  } else {
    throw new Error("Subscribe button not found");
  }
}

async function commentVideo() {
  window.scrollBy(0, 450);
  console.log("Scrolled");
  const placeholder = document.getElementById("placeholder-area");
  if (placeholder) {
    placeholder.focus();
    placeholder.click();
    document.execCommand("insertText", true, "comment function executed");
  } else {
    throw new Error("Placeholder area not found");
  }

  var buttonInterval = setInterval(function () {
    var button = document.getElementById("submit-button");
    if (button) {
      clearInterval(buttonInterval);
      button.click();
    } else {
      console.log("Button with ID 'submit-button' not found.");
    }
  }, 1000);
}



function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
