function abrirSobre() {
    const sobre = document.querySelector(".sobre");
    const sello = document.querySelector(".sello");
    const contenido = document.querySelector(".contenido");
    const musica = document.getElementById("musica");

    sobre.classList.add("abierto");
    // ocultar sello correctamente
    if (sello) {
        sello.style.display = "none";
        // o sello.remove();
    }

    // ocultar invitados correctamente
    if (invitados) {
        invitados.style.display = "none";
    }

    setTimeout(() => {
        sobre.style.display = "none";
        contenido.classList.remove("oculto");
        musica.play();
        iniciarCuentaRegresiva();
    }, 1000);
}

function confirmarAsistencia() {
    let nombre = prompt("Ingresa tu nombre:");
    if (nombre) {
        alert("Gracias " + nombre + " 💖");
    }
}

function iniciarCuentaRegresiva() {
    const fecha = new Date("Dec 19, 2026 17:00:00").getTime();

    setInterval(() => {
        const ahora = new Date().getTime();
        const d = fecha - ahora;

        const dias = Math.floor(d / (1000 * 60 * 60 * 24));
        const horas = Math.floor((d / (1000 * 60 * 60)) % 24).toString().padStart(2, "0");
        const minutos = Math.floor((d / (1000 * 60)) % 60).toString().padStart(2, "0");
        const segundos = Math.floor((d / 1000) % 60).toString().padStart(2, "0");

        document.getElementById("countdown").innerHTML = `
            <div class="tiempo">
                <span class="numero">${dias}</span>
                <span class="label">días</span>
            </div>
            <div class="tiempo">
                <span class="numero">${horas}</span>
                <span class="label">hrs</span>
            </div>
            <div class="tiempo">
                <span class="numero">${minutos}</span>
                <span class="label">min</span>
            </div>
            <div class="tiempo">
                <span class="numero">${segundos}</span>
                <span class="label">seg</span>
            </div>
        `;
    }, 1000);
}

/* NIEVE */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let w, h;
let flakes = [];

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

for (let i = 0; i < 100; i++) {
    flakes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 4 + 1,
        d: Math.random()
    });
}

function snow() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "white";
    ctx.beginPath();

    flakes.forEach(f => {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    });

    ctx.fill();
    move();
}

let angle = 0;
function move() {
    angle += 0.01;
    flakes.forEach(f => {
        f.y += Math.cos(angle) + 1;
        f.x += Math.sin(angle);

        if (f.y > h) {
            f.y = 0;
            f.x = Math.random() * w;
        }
    });
}

setInterval(snow, 125);