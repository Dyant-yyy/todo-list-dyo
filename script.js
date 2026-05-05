let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "all";

function simpanData() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function setFilter(f) {
    filter = f;
    render();
}

function tambahTugas() {
    const teks = document.getElementById("inputTugas").value;
    const kategori = document.getElementById("kategori").value;
    const deadline = document.getElementById("deadline").value;

    if (teks === "") return;

    todos.push({
        text: teks,
        selesai: false,
        kategori: kategori,
        deadline: deadline
    });

    simpanData();
    render();

    document.getElementById("inputTugas").value = "";
}

function render() {
    const list = document.getElementById("listTugas");
    const search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    let selesaiCount = 0;

    todos.forEach((tugas, index) => {

        if (filter === "active" && tugas.selesai) return;
        if (filter === "done" && !tugas.selesai) return;
        if (!tugas.text.toLowerCase().includes(search)) return;

        const li = document.createElement("li");

        let teks = `${tugas.text} (${tugas.kategori})`;

        if (tugas.deadline) {
            teks += ` - ${tugas.deadline}`;
        }

        li.textContent = teks;

        if (tugas.selesai) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.5";
            selesaiCount++;
        }

       
        if (tugas.deadline && new Date(tugas.deadline) < new Date() && !tugas.selesai) {
            li.style.color = "red";
        }

        li.onclick = function () {
            todos[index].selesai = !todos[index].selesai;
            simpanData();
            render();
        };

        const del = document.createElement("button");
        del.textContent = "❌";

        del.onclick = function (e) {
            e.stopPropagation();
            todos.splice(index, 1);
            simpanData();
            render();
        };

        li.appendChild(del);
        list.appendChild(li);
    });

    document.getElementById("progress").textContent =
        `Progress: ${selesaiCount} / ${todos.length}`;
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

if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
}


render();