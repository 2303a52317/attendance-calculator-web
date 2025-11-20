function calculateAttendance() {
    const total = Number(document.getElementById("total").value);
    const attended = Number(document.getElementById("attended").value);

    const resultBox = document.getElementById("result");

    if (total <= 0 || attended < 0 || attended > total) {
        resultBox.style.display = "block";
        resultBox.innerHTML = "⚠️ Please enter valid numbers!";
        return;
    }

    const percentage = ((attended / total) * 100).toFixed(2);
    let message = `<strong>Attendance: ${percentage}%</strong><br>`;

    if (percentage >= 75) {
        const canSkip = Math.floor((attended / 0.75) - total);
        message += `🎉 You are safe! You can skip <b>${canSkip}</b> classes.`;
    } else {
        const need = Math.ceil((0.75 * total) - attended);
        message += `⚠️ You need to attend <b>${need}</b> more classes.`;
    }

    resultBox.style.display = "block";
    resultBox.innerHTML = message;
}
