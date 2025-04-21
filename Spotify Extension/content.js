let intervalId = null;

function findLoadMoreButton() {
  // Primary: Find button with data-encore-id="chip" and "Load more episodes" text
  const chipButtons = document.querySelectorAll('button[data-encore-id="chip"]');
  const target = Array.from(chipButtons).find(el => el.textContent.trim() === 'Load more episodes');
  
  // Fallback: Any button with "Load more episodes" text
  if (!target) {
    const allButtons = document.querySelectorAll('button');
    return Array.from(allButtons).find(el => el.textContent.trim() === 'Load more episodes');
  }
  
  return target;
}

function startAutoClicking() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(() => {
    try {
      const element = findLoadMoreButton();
      if (element) {
        element.click();
        console.log('Clicked "Load more episodes" button');
      } else {
        console.log('Button not found');
      }
    } catch (error) {
      console.log('Error during auto-click:', error.message);
    }
  }, 100);
}

function stopAutoClicking() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

try {
  startAutoClicking();
} catch (error) {
  console.log('Error starting auto-clicker:', error.message);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start") {
    startAutoClicking();
    sendResponse({ status: "started" });
  }
  if (message.action === "stop") {
    stopAutoClicking();
    sendResponse({ status: "stopped" });
  }
});