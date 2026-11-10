/* ---------- EVENTOS GERAIS ---------- */
document.getElementById("search").addEventListener("input", render);
document.getElementById("statusFilter").addEventListener("change", render);
document.getElementById("nextGoal").addEventListener("click", () => { selectedCategory = "Metas"; document.querySelectorAll(".navbtn").forEach(b => b.classList.toggle("active", b.dataset.filter === "Metas")); render(); });
document.querySelectorAll(".navbtn").forEach(btn => btn.addEventListener("click", () => {
    selectedCategory = btn.dataset.filter; document.querySelectorAll(".navbtn").forEach(b => b.classList.toggle("active", b === btn)); render();
}));
render();
