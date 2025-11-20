function calculate() {
    let total = parseInt(document.getElementById("total").value);
    let attended = parseInt(document.getElementById("attended").value);
    let result = document.getElementById("result");

    if (!total || !attended || attended > total) {
        result.style.display = "block";
        result.innerHTML = "⚠️ Please enter valid numbers!";
        return;
    }

    let percentage = ((attended / total) * 100).toFixed(2);
    let needed = Math.ceil((0.75 * total) - attended);

    let msg = `<strong>Attendance: ${percentage}%</strong><br><br>`;

    if (percentage < 75) {
        msg += `📌 You must attend <strong>${needed}</strong> more classes to reach 75%.`;
    } else {
        msg += `🎉 You are safe! You can skip <strong>${Math.floor(attended - 0.75 * total)}</strong> classes.`;
    }

    result.style.display = "block";
    result.innerHTML = msg;
}
