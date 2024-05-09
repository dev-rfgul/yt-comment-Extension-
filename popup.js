document.getElementById("startBtn").addEventListener("click", function () {
  chrome.runtime.sendMessage({ message: "startProcess", response: "start" });
  createURLArray();
});

async function createURLArray() {
  const URL = document.getElementById("input").value;
  let URLsArray = URL.split("\n");

  chrome.storage.local.set({ URLsArray: URLsArray }, function () {
    console.log("URLsArray is set to " + URLsArray);
  });
  console.log(URLsArray);
}
