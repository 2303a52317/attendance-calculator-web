function calculate() {
  const total = parseInt(document.getElementById("total").value);
  const attended = parseInt(document.getElementById("attended").value);
  const required = parseFloat(document.getElementById("required").value);
  const result = document.getElementById("result");

  if (isNaN(total) || isNaN(attended) || total <= 0) {
    result.textContent = "⚠️ Please enter valid numbers.";
    return;
  }

  const percent = (attended / total) * 100;
  let text = `Attendance: ${percent.toFixed(2)}%\n`;

  if (percent >= required) {
    text += "✅ You meet the required attendance.";
  } else {
    const needed = Math.ceil((required / 100 * total - attended) / (1 - required / 100));
    text += `❌ You need ${needed} more class(es) to reach ${required}%.`;
  }

  result.textContent = text;
}

function predictFuture() {
  const total = parseInt(document.getElementById("total").value);
  const attended = parseInt(document.getElementById("attended").value);
  const result = document.getElementById("result");

  const missed = prompt("Enter number of classes you might miss:");
  if (missed === null || missed === "") return;

  const futureTotal = total + parseInt(missed);
  const futurePercent = (attended / futureTotal) * 100;
  result.textContent = `If you miss ${missed} class(es),\nyour attendance will be ${futurePercent.toFixed(2)}%.`;
}

function skipAdvisor() {
  const total = parseInt(document.getElementById("total").value);
  const attended = parseInt(document.getElementById("attended").value);
  const required = parseFloat(document.getElementById("required").value);
  const result = document.getElementById("result");

  if (attended > total) {
    result.textContent = "⚠️ Attended cannot exceed total.";
    return;
  }

  let safeSkips = 0;
  while ((attended / (total + safeSkips)) * 100 >= required) {
    safeSkips++;
  }
  safeSkips = Math.max(0, safeSkips - 1);

  result.textContent = `🎯 You can safely skip ${safeSkips} class(es) and still maintain ${required}% attendance.`;
}
