let todos = JSON.parse(localStorage.getItem("todos")) || [];

function simpanData() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
    const list = document.getElementById("listTugas");
    list.innerHTML = "";

    todos.forEach((tugas, index) => {
        const li = document.createElement("li");
        li.textContent = tugas.text;

        if (tugas.selesai) {
           li.style.textDecoration = tugas.selesai ? "line-through" : "none";
li.style.opacity = tugas.selesai ? "0.5" : "1";
        }

        li.onclick = function () {
            todos[index].selesai = !todos[index].selesai;
            simpanData();
            render();
        };

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "❌";

        tombolHapus.onclick = function (e) {
            e.stopPropagation();
            todos.splice(index, 1);
            simpanData();
            render();
        };

        li.appendChild(tombolHapus);
        list.appendChild(li);
    });
}

function tambahTugas() {
    const input = document.getElementById("inputTugas");
    const teks = input.value;

    if (teks === "") return;

    todos.push({
        text: teks,
        selesai: false
    });

    simpanData();
    render();

    input.value = "";
}
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    const btn = document.getElementById("darkBtn");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
        btn.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("mode", "light");
        btn.textContent = "🌙 Dark Mode";
    }
}
// tampilkan saat pertama kali buka
render();