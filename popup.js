document.getElementById("startBtn").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "startProcess" });
  });

  const URL = document.getElementById("input").value;
  let URLsArray = URL.split("\n");
  for (let i = 0; i < URLsArray.length; i++) {
    console.log(URLsArray[i]);

    chrome.tabs.create({ url: URLsArray[i] });
  }

  console.log(URLsArray);
});

// https://www.youtube.com/watch?v=BuaKzm7Kq9Q
// https://www.youtube.com/watch?v=cvh0nX08nRw
// https://www.youtube.com/watch?v=qAJm4XD2mUY
// https://www.youtube.com/watch?v=D0oMGeqwbJo
// https://www.youtube.com/watch?v=MgxTazCnkSk
