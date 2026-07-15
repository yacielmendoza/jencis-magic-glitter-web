# Despliegue continuo — Jencis Magic Glitter (GitHub → Netlify/Vercel)

Meta: cada `git push` publica la web automáticamente. Ya dejé el repo git inicializado y con el primer commit. Faltan **2 pasos con tu cuenta** (Yaciel).

---

## ⚠️ Antes: OneDrive + git
Esta carpeta está dentro de OneDrive. Git y OneDrive pueden pelearse (OneDrive sincroniza `.git` y puede corromperlo). **Recomendado:** mueve la carpeta `landing` fuera de OneDrive (ej. `C:\Users\Yaciel\dev\jencis-magic-glitter-web`) antes de trabajar seguido, **o** pausa la sincronización de OneDrive para esta carpeta. (El commit inicial ya está hecho; funciona igual.)

---

## Paso 1 — Subir a GitHub
**Con GitHub CLI (rápido):**
```bash
gh repo create jencis-magic-glitter-web --public --source=. --remote=origin --push
```
**O manual:**
1. Crea un repo nuevo en **github.com/new** (nombre: `jencis-magic-glitter-web`, sin README).
2. En una terminal, dentro de la carpeta `landing`:
```bash
git remote add origin https://github.com/TU-USUARIO/jencis-magic-glitter-web.git
git branch -M main
git push -u origin main
```

## Paso 2 — Conectar el auto-deploy (elige uno)

**Netlify:**
1. app.netlify.com → **Add new site → Import an existing project → GitHub**.
2. Elige el repo `jencis-magic-glitter-web`.
3. Publish directory: `.` (ya está en `netlify.toml`). → **Deploy**.
4. Listo: cada push se publica solo.

**Vercel (alternativa):**
1. vercel.com → **Add New → Project** → importa el repo.
2. Framework Preset: **Other** (es sitio estático). → **Deploy**.
3. Listo: auto-deploy en cada push.

## Paso 3 — Dominio propio (opcional)
En Netlify/Vercel → **Domain settings** → agrega `jencismagicglitter.com` y sigue los pasos de DNS.

---

## Flujo de trabajo para cambios
```bash
# editas index.html ...
git add .
git commit -m "Actualizo precios del catálogo"
git push
# ~30 segundos después ya está en vivo ✨
```

## Para cambios, dime a mí
Puedes pedirme los cambios (ej. "cambia el precio de 20oz a $42") y yo edito el `index.html`; luego tú solo haces `git push` (o me dices y te doy el comando exacto).
