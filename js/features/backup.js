/* ---------- BACKUP: EXPORTAR E IMPORTAR ---------- */
const toastEl = document.getElementById("toast"); let toastT;
function toast(msg) { toastEl.textContent = msg; toastEl.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("show"), 3500); }
const pad = n => String(n).padStart(2, "0");
function showBackupNote() {
    const note = document.getElementById("backupNote"); let v = null;
    try { v = localStorage.getItem(BKEY) } catch (e) { }
    const d = v ? new Date(v) : null;
    if (!d || isNaN(d.getTime())) { note.textContent = "Último backup: nunca"; note.classList.add("warn"); return; }
    const days = Math.floor((Date.now() - d.getTime()) / 864e5);
    note.textContent = "Último backup: " + pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + (days >= 7 ? " (há " + days + " dias)" : "");
    note.classList.toggle("warn", days >= 7);
}
document.getElementById("exportBtn").addEventListener("click", () => {
    const now = new Date();
    const data = { app: "minha-trilha-dev", version: 3, exportedAt: now.toISOString(), state };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "trilha-dev-backup-" + now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate()) + ".json";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    try { localStorage.setItem(BKEY, now.toISOString()) } catch (e) { }
    showBackupNote(); toast("Backup baixado. Guarde o arquivo num lugar seguro.");
});
document.getElementById("importBtn").addEventListener("click", () => document.getElementById("importFile").click());
document.getElementById("importFile").addEventListener("change", e => {
    const f = e.target.files && e.target.files[0]; e.target.value = ""; if (!f) return;
    if (f.size > 2 * 1024 * 1024) { toast("Arquivo grande demais para ser um backup da trilha."); return; }
    const rd = new FileReader();
    rd.onerror = () => toast("Não consegui ler o arquivo.");
    rd.onload = () => {
        let j;
        try { j = JSON.parse(rd.result) } catch (err) { toast("Arquivo inválido. Use um backup exportado por esta trilha."); return; }
        if (!j || j.app !== "minha-trilha-dev" || !j.state || typeof j.state !== "object") { toast("Arquivo inválido. Use um backup exportado por esta trilha."); return; }
        const ns = sanitize(j.state); const n = Object.keys(ns).length;
        const msg = n ? `Importar backup com progresso em ${n} habilidades? Isso substitui o progresso atual deste navegador.` : "Este backup está vazio. Importar vai ZERAR o progresso atual deste navegador. Continuar?";
        if (!confirm(msg)) return;
        state = ns; save(); render(); renderDrawer(); toast(n ? "Progresso importado com sucesso." : "Progresso zerado pelo backup vazio.");
    };
    rd.readAsText(f);
});
showBackupNote();
