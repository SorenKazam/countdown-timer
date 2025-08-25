var todaySpecialDay = false;

function calculateDays() {
  const startDate = new Date("2024-10-08");
  const endDate = new Date("2025-12-03");
  const today = new Date();
  const todayDay = today.getDate();

  localStorage.setItem("startDate", startDate.toLocaleDateString("pt-PT"));
  localStorage.setItem("endDate", endDate.toLocaleDateString("pt-PT"));
  localStorage.setItem("todayDate", today.toLocaleDateString("pt-PT"));

  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

  document.getElementById(
    "daysCount"
  ).innerText = `Já se passaram ${daysPassed} dias desde 08/10/2024.`;
  document.getElementById(
    "daysRemaining"
  ).innerText = `Faltam ${daysRemaining} dias até 01/12/2025.`;

  const progressPercentage = (daysPassed / totalDays) * 100;
  document.getElementById("percentage").innerText = `${Math.floor(
    progressPercentage
  )}%`;
  document.getElementById("progressBar").style.width = progressPercentage + "%";

  if (progressPercentage <= 1) {
    document.getElementById("status").innerText = "👨🏻";
  } else if (progressPercentage > 1 && progressPercentage < 100) {
    document.getElementById("status").innerText = "✈️";
  } else if (progressPercentage == 100) {
    document.getElementById("status").innerText = "🧑🏻‍❤️‍💋‍👩🏻";
  }

  document.title = `Faltam ${daysRemaining.toString()} dias`;

  if (todayDay === 8) {
    console.log("Today is a special day!");
    document.title = `❤️ Faltam ${daysRemaining} dias`;
    todaySpecialDay = true;
    updateSpecialDay(todayDay);
  } else {
    todaySpecialDay = false;
  }
}

function memoryReset() {
  console.log("Page refreshed, resetting Memory...");
  localStorage.clear();
  calculateDays();
}

function getNowTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function updateDetailedCountdown() {
  const now = new Date();
  const endDate = new Date("2025-12-01");
  const diff = endDate - now;

  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const weeks = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7)
  );
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById(
    "detailedCounter"
  ).innerText = `Faltam ${months} meses, ${weeks} semanas, ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos.`;
}

function updateBackground() {
  var body = document.body;
  var hours = new Date().getHours();
  body.style.backgroundImage =
    hours >= 6 && hours < 18
      ? "url(./assets/day.jpg)"
      : "url(./assets/night.jpeg)";
}

function updateSpecialDay(day) {
  console.log("Update Special Day called!");
  if (day === 8) {
    document.getElementById("status").innerText = "❤️";
    document.body.style.backgroundImage = "url(./assets/special.jpg)";
  }
}

setInterval(() => {
  console.log("Checking...");
  localStorage.setItem("lastCheck", getNowTime());

  const now = new Date().getDate();
  if (localStorage.getItem("lastUpdate") !== now.toString()) {
    console.log("Date changed, updating...");
    localStorage.setItem("lastUpdate", now.toString());
    calculateDays();
  } else if (!todaySpecialDay) {
    console.log("Day not changed, and today is not special day");
    updateBackground();
  }
}, 60000);

setInterval(updateDetailedCountdown, 1000);

memoryReset();
