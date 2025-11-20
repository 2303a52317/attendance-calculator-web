// Helpers
function safeInt(v){ v = parseInt(v); return (isNaN(v) || v < 0) ? null : v; }

// 1) Current Attendance
function calcCurrent(){
  const t = safeInt(document.getElementById("c_total").value);
  const a = safeInt(document.getElementById("c_attended").value);
  const out = document.getElementById("c_result");
  if(t === null || a === null){ out.textContent = "⚠️ Enter valid non-negative numbers."; return; }
  if(a > t){ out.textContent = "⚠️ Attended cannot exceed total."; return; }
  const pct = (t === 0) ? 0 : (a / t) * 100;
  let text = `Attendance: ${pct.toFixed(2)}%`;
  if(pct >= 75) {
    // compute how many you may skip (safe skip while still >=75)
    // find max x such that a/(t+x) *100 >=75 -> (a)/(t+x) >= 0.75 -> t+x <= a/0.75 -> x <= a/0.75 - t
    const maxTotalAllowed = a / 0.75;
    const safeSkips = Math.max(0, Math.floor(maxTotalAllowed - t));
    text += `\n✅ You meet 75%.\nYou can safely skip ${safeSkips} class(es).`;
  } else {
    // classes needed to reach 75%
    // solve (a + x)/(t + x) >= 0.75 -> x >= (0.75*t - a)/(1-0.75)
    const r = 0.75;
    const denom = 1 - r;
    const x = Math.ceil((r * t - a) / denom);
    text += `\n❌ You need to attend at least ${Math.max(0,x)} more class(es) to reach 75%.`;
  }
  out.textContent = text;
}

// 2) Reach 75%: how many classes to attend
function calcReach75(){
  const t = safeInt(document.getElementById("r_total").value);
  const a = safeInt(document.getElementById("r_attended").value);
  const out = document.getElementById("r_result");
  if(t === null || a === null){ out.textContent = "⚠️ Enter valid non-negative numbers."; return; }
  if(a > t){ out.textContent = "⚠️ Attended cannot exceed total."; return; }
  if(t === 0 && a === 0){ out.textContent = "If you start from 0, attend classes to build attendance."; return; }
  const r = 0.75;
  const denom = 1 - r;
  if(denom <= 0){ out.textContent = "⚠️ Required percent invalid."; return; }
  const need = Math.ceil((r * t - a) / denom);
  if(need <= 0) out.textContent = `🎉 You already have ${((a/t)*100).toFixed(2)}% (or enough).`;
  else out.textContent = `You must attend ${need} more class(es) (consecutively) to reach 75%.`;
}

// 3) Skip Advisor: how many can skip now safely
function calcSkip(){
  const t = safeInt(document.getElementById("s_total").value);
  const a = safeInt(document.getElementById("s_attended").value);
  const out = document.getElementById("s_result");
  if(t === null || a === null){ out.textContent = "⚠️ Enter valid non-negative numbers."; return; }
  if(a > t){ out.textContent = "⚠️ Attended cannot exceed total."; return; }
  // if below 75 already
  const pct = (t === 0) ? 0 : (a / t) * 100;
  if(pct < 75){ out.textContent = `⚠️ You are already below 75% (${pct.toFixed(2)}%). Focus on attending.`; return; }
  // find max x such that a/(t+x) >= 0.75 -> x <= a/0.75 - t
  const maxTotalAllowed = a / 0.75;
  let safeSkips = Math.floor(maxTotalAllowed - t);
  if(safeSkips < 0) safeSkips = 0;
  out.textContent = `You can skip ${safeSkips} class(es) and still maintain ≥75%. Current: ${pct.toFixed(2)}%`;
}
