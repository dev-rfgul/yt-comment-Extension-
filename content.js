// // Function to subscribe to the channel
// function subscribeChannel() {
//   const subscribeButton = document.querySelector(
//     ".ytd-subscribe-button-renderer"
//   );
//   if (subscribeButton) {
//     subscribeButton.click();
//   }
// }

// // Function to like and comment on the video
// function likeAndComment() {
//   const likeButton = document.querySelector(
//     ".style-scope ytd-toggle-button-renderer"
//   );
//   if (likeButton) {
//     likeButton.click();
//   }

//   const commentBox = document.querySelector("#contenteditable-root");
//   if (commentBox) {
//     commentBox.innerText = "Nice";
//     // Simulate Enter key press to submit comment
//     const enterKeyEvent = new KeyboardEvent("keydown", { key: "Enter" });
//     commentBox.dispatchEvent(enterKeyEvent);
//   }
// }

// // Subscribe to the channel and then navigate to the videos page
// subscribeChannel();
// // window.location.href = "https://www.youtube.com/channel/@DrumsetFundamentals/videos";

chrome.runtime.onMessage.addListener(async function (request) {
  if (request.message === "startProcess") {
    subscribeChannel();
  }

  // Function to subscribe to the channel
  function subscribeChannel() {
    return new Promise((resolve, reject) => {
      const subscribeButton = document.querySelector(
        ".ytd-subscribe-button-renderer"
      );
      if (subscribeButton) {
        subscribeButton.click();
        resolve("Subscribed successfully"); // Assuming click() will subscribe
      } else {
        reject("Subscribe button not found");
      }
    });
  }

  subscribeChannel()
    .then((message) => {
      console.log(message); // Subscribed successfully
    })
    .catch((error) => {
      console.error(error); // Subscribe button not found
    });
});
