/* Tela de acesso: valida a chave (hash SHA-256) e libera o app. Usa as constantes de config.js */

(() => {
    const $ = id => document.getElementById(id);
    const AUTH_KEY = "trilhadev:auth";
    const gate = $("gate"), form = $("gateForm"), input = $("gateInput"), err = $("gateErr"), msg = $("gateMsg"),
        btn = $("gateBtn"), remember = $("gateRemember"), rememberRow = $("gateRememberRow"), setup = $("gateSetup"),
        hashOut = $("gateHash"), copyBtn = $("gateCopy"), eye = $("gateEye");
    const configured = /^[0-9a-f]{64}$/.test(ACCESS_PASSWORD_HASH);
    let fails = 0, lockedUntil = 0, tick = 0;

    const sha = async txt => {
        if (!(window.crypto && crypto.subtle)) throw new Error("nocrypto");
        const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(GATE_SALT + txt));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
    };
    const stored = () => { try { return localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY) } catch (e) { return null } };
    const clearAuth = () => { try { localStorage.removeItem(AUTH_KEY); sessionStorage.removeItem(AUTH_KEY) } catch (e) { } };
    const saveAuth = (h, keep) => { clearAuth(); try { (keep ? localStorage : sessionStorage).setItem(AUTH_KEY, h) } catch (e) { } };
    const showErr = t => { err.textContent = t; };
    const shake = () => { const c = gate.querySelector(".gate-card"); c.classList.remove("shake"); void c.offsetWidth; c.classList.add("shake"); };

    function prepare() {
        form.reset(); input.type = "password"; showErr(""); btn.disabled = false; setup.hidden = true;
        if (configured) {
            msg.textContent = "Digite sua chave de acesso para entrar."; btn.textContent = "Entrar"; rememberRow.hidden = false;
        } else {
            msg.textContent = "Chave ainda não configurada. Digite a chave que você quer usar e gere o código para colar no arquivo.";
            btn.textContent = "Gerar código"; rememberRow.hidden = true;
        }
        setTimeout(() => input.focus(), 50);
    }
    function unlock() {
        const b = document.body;
        gate.classList.add("leaving"); b.classList.remove("is-locked"); b.classList.add("enter");
        setTimeout(() => { gate.hidden = true; gate.classList.remove("leaving"); }, 650);
        setTimeout(() => b.classList.remove("enter"), 2400);
    }
    function lock() {
        clearAuth(); fails = 0; lockedUntil = 0;
        if (typeof closeDrawer === "function") closeDrawer();
        document.body.classList.add("is-locked"); gate.hidden = false; prepare();
    }

    form.addEventListener("submit", async e => {
        e.preventDefault();
        const pw = input.value;
        if (!pw) { showErr("Digite a chave."); shake(); return; }
        const wait = Math.ceil((lockedUntil - Date.now()) / 1000);
        if (wait > 0) { showErr("Muitas tentativas. Aguarde " + wait + "s."); return; }
        btn.disabled = true;
        let h;
        try { h = await sha(pw); }
        catch (x) { showErr("Seu navegador bloqueou a criptografia. Abra o arquivo por https:// ou localhost."); btn.disabled = false; return; }
        if (!configured) {
            hashOut.value = 'const ACCESS_PASSWORD_HASH = "' + h + '";';
            setup.hidden = false; showErr(""); btn.disabled = false; hashOut.focus(); hashOut.select(); return;
        }
        if (h === ACCESS_PASSWORD_HASH) {
            saveAuth(h, remember.checked); fails = 0; showErr(""); unlock();
        } else {
            fails++; input.value = ""; shake();
            if (fails >= 3) {
                const s = Math.min(60, 2 ** (fails - 2)); lockedUntil = Date.now() + s * 1000;
                clearInterval(tick);
                tick = setInterval(() => {
                    const r = Math.ceil((lockedUntil - Date.now()) / 1000);
                    if (r <= 0) { clearInterval(tick); showErr(""); btn.disabled = false; input.focus(); }
                    else { showErr("Chave incorreta. Aguarde " + r + "s."); btn.disabled = true; }
                }, 250);
            } else { showErr("Chave incorreta."); btn.disabled = false; input.focus(); }
        }
    });
    eye.addEventListener("click", () => { input.type = input.type === "password" ? "text" : "password"; input.focus(); });
    copyBtn.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(hashOut.value); copyBtn.textContent = "Copiado ✓"; }
        catch (x) { hashOut.select(); copyBtn.textContent = "Selecionado: use Ctrl+C"; }
        setTimeout(() => { copyBtn.textContent = "Copiar linha"; }, 2500);
    });
    document.addEventListener("click", e => { if (e.target.closest("#logoutBtn")) lock(); });

    /* Já autenticado neste navegador? Entra direto (com a animação de entrada). */
    if (configured && stored() === ACCESS_PASSWORD_HASH) {
        gate.hidden = true; document.body.classList.remove("is-locked"); document.body.classList.add("enter");
        setTimeout(() => document.body.classList.remove("enter"), 2400);
    } else { prepare(); }
})();
