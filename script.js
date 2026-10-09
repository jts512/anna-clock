const programStart = new Date("2026-05-17T00:00:00");
const programEnd = new Date("2028-05-17T00:00:00");

const unitMap = {
  years: document.getElementById("years"),
  months: document.getElementById("months"),
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

const statusText = document.getElementById("statusText");
const progressValue = document.getElementById("progressValue");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const targetText = document.getElementById("targetText");

function getCountdownParts(targetDate) {
  const now = new Date();
  let remainingMs = Math.max(0, targetDate.getTime() - now.getTime());

  const yearMs = 365.25 * 24 * 60 * 60 * 1000;
  const monthMs = 30.4375 * 24 * 60 * 60 * 1000;
  const dayMs = 24 * 60 * 60 * 1000;
  const hourMs = 60 * 60 * 1000;
  const minuteMs = 60 * 1000;

  const years = Math.floor(remainingMs / yearMs);
  remainingMs -= years * yearMs;

  const months = Math.floor(remainingMs / monthMs);
  remainingMs -= months * monthMs;

  const days = Math.floor(remainingMs / dayMs);
  remainingMs -= days * dayMs;

  const hours = Math.floor(remainingMs / hourMs);
  remainingMs -= hours * hourMs;

  const minutes = Math.floor(remainingMs / minuteMs);
  remainingMs -= minutes * minuteMs;

  const seconds = Math.floor(remainingMs / 1000);

  return { years, months, days, hours, minutes, seconds };
}

function getProgressPercent() {
  const now = new Date();
  const totalDuration = programEnd.getTime() - programStart.getTime();
  const elapsed = now.getTime() - programStart.getTime();

  if (elapsed <= 0) return 0;
  if (now >= programEnd) return 100;

  return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
}

function formatValue(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();

  if (now >= programEnd) {
    Object.values(unitMap).forEach((element) => {
      element.textContent = "00";
    });

    statusText.textContent = "Program complete — Anna is finished!";
    progressValue.textContent = "100%";
    progressFill.style.width = "100%";
    progressText.textContent = "Completed on May 17, 2028";
    targetText.textContent = "Celebration time!";
    document.querySelector(".progress-bar").setAttribute("aria-valuenow", "100");
    return;
  }

  const parts = getCountdownParts(programEnd);

  unitMap.years.textContent = formatValue(parts.years);
  unitMap.months.textContent = formatValue(parts.months);
  unitMap.days.textContent = formatValue(parts.days);
  unitMap.hours.textContent = formatValue(parts.hours);
  unitMap.minutes.textContent = formatValue(parts.minutes);
  unitMap.seconds.textContent = formatValue(parts.seconds);

  const percentComplete = getProgressPercent();
  const roundedPercent = Math.round(percentComplete);

  statusText.textContent = "Counting down to graduation";
  progressValue.textContent = `${roundedPercent}%`;
  progressFill.style.width = `${roundedPercent}%`;
  progressText.textContent = `Started May 17, 2026`;
  targetText.textContent = `Ends May 17, 2028`;
  document.querySelector(".progress-bar").setAttribute("aria-valuenow", String(roundedPercent));
}

updateCountdown();
setInterval(updateCountdown, 1000);
