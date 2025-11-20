function calculate() {
    const total = parseInt(document.getElementById("total").value);
    const attended = parseInt(document.getElementById("attended").value);

    if (!total || !attended || attended > total) {
        alert("Please enter valid numbers!");
        return;
    }

    const percentage = ((attended / total) * 100).toFixed(2);
    document.getElementById("percentage").innerHTML = `Attendance: ${percentage}%`;

    let need = "";
    let bunk = "";

    if (percentage < 75) {
        const required = Math.ceil((0.75 * total - attended) / 0.25);
        need = `📘 You need to attend <b>${required}</b> more classes to reach 75%.`;
    } else {
        const canBunk = Math.floor((attended / 0.75) - total);
        bunk = `🎉 You can still skip <b>${canBunk}</b> classes and stay above 75%.`;
    }

    document.getElementById("need").innerHTML = need;
    document.getElementById("bunk").innerHTML = bunk;

    document.getElementById("resultBox").style.display = "block";
}
