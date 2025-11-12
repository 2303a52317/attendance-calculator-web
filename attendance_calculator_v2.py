import tkinter as tk
from tkinter import messagebox
from math import ceil

def calculate():
    try:
        total = int(total_entry.get())
        attended = int(attended_entry.get())
        required = float(required_entry.get())
    except ValueError:
        messagebox.showerror("Invalid input", "Please enter valid numbers.")
        return

    if total <= 0:
        messagebox.showerror("Invalid input", "Total classes must be > 0.")
        return

    percent = (attended / total) * 100
    res = f"Attendance: {percent:.2f}%"

    if percent >= required:
        res += f"\n✅ You meet the required attendance."
    else:
        r = required / 100
        x = (r * total - attended) / (1 - r)
        needed = max(0, ceil(x))
        res += f"\n❌ You need {needed} more class(es) to reach {required}%."

    result_label.config(text=res)

def predict_future():
    try:
        total = int(total_entry.get())
        attended = int(attended_entry.get())
        missed = int(missed_entry.get())
    except ValueError:
        messagebox.showerror("Invalid input", "Enter valid numbers.")
        return

    if missed < 0:
        messagebox.showerror("Invalid input", "Missed classes cannot be negative.")
        return

    future_total = total + missed
    future_percent = (attended / future_total) * 100 if future_total > 0 else 0
    messagebox.showinfo("Future Prediction",
                        f"If you miss next {missed} class(es),\nattendance will be {future_percent:.2f}%")

def skip_advisor():
    try:
        total = int(total_entry.get())
        attended = int(attended_entry.get())
        required = float(required_entry.get())
    except ValueError:
        messagebox.showerror("Invalid input", "Enter valid numbers.")
        return

    if total <= 0:
        messagebox.showerror("Invalid input", "Total must be > 0.")
        return

    percent = (attended / total) * 100
    if percent < required:
        messagebox.showwarning("Advisor", "You are already below required attendance!")
        return

    safe_skips = 0
    # increment safe_skips until new percent would fall below required
    while True:
        new_total = total + safe_skips
        if new_total == 0:
            break
        new_percent = (attended / new_total) * 100
        if new_percent < required:
            break
        safe_skips += 1
    safe_skips = max(0, safe_skips - 1)
    messagebox.showinfo("Safe Skips",
                        f"You can safely skip {safe_skips} class(es) and still maintain {required}% attendance.")

def save_record():
    total = total_entry.get().strip()
    attended = attended_entry.get().strip()
    required = required_entry.get().strip()
    result = result_label.cget("text").strip()

    if not total or not attended:
        messagebox.showwarning("Incomplete", "Please enter values and click Calculate first.")
        return

    with open("attendance_history.txt", "a", encoding="utf-8") as f:
        f.write(f"Total: {total}, Attended: {attended}, Required: {required}% -> {result}\n")
    messagebox.showinfo("Saved", "Attendance record saved to attendance_history.txt")

# ---- UI Setup ----
root = tk.Tk()
root.title("Smart Attendance Calculator")
root.geometry("420x460")
root.resizable(False, False)

tk.Label(root, text="Total classes held:").pack(pady=(10,0))
total_entry = tk.Entry(root)
total_entry.pack()

tk.Label(root, text="Classes attended:").pack(pady=(8,0))
attended_entry = tk.Entry(root)
attended_entry.pack()

tk.Label(root, text="Required attendance %:").pack(pady=(8,0))
required_entry = tk.Entry(root)
required_entry.insert(0, "75")
required_entry.pack()

tk.Label(root, text="Predict if you miss (x) classes:").pack(pady=(8,0))
missed_entry = tk.Entry(root)
missed_entry.insert(0, "2")
missed_entry.pack()

tk.Button(root, text="Calculate", width=20, command=calculate).pack(pady=10)
tk.Button(root, text="Predict Future", width=20, command=predict_future).pack(pady=5)
tk.Button(root, text="Skip Advisor", width=20, command=skip_advisor).pack(pady=5)
tk.Button(root, text="Save Record", width=20, command=save_record).pack(pady=5)

result_label = tk.Label(root, text="", justify="left", wraplength=380, anchor="w")
result_label.pack(pady=18, padx=10, fill="x")

root.mainloop()
