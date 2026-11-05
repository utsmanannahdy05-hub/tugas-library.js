document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. DATA DUMMY
  // ==========================================
  const dataProduk = [
    { id: 1, nama: "Nasi Goreng", kategori: "Makanan", terjual: 38, harga: 10000 },
    { id: 2, nama: "Mie Ayam", kategori: "Makanan", terjual: 23, harga: 8000 },
    { id: 3, nama: "Nasi Uduk", kategori: "Makanan", terjual: 23, harga: 7000 },
    { id: 4, nama: "Air Mineral", kategori: "Minuman", terjual: 34, harga: 4000 },
    { id: 5, nama: "Es Teh Manis", kategori: "Minuman", terjual: 42, harga: 3000 },
    { id: 6, nama: "Jus Alpukat", kategori: "Minuman", terjual: 15, harga: 10000 },
    { id: 7, nama: "Keripik Singkong", kategori: "Snack", terjual: 25, harga: 5000 },
    { id: 8, nama: "Roti Bakar", kategori: "Snack", terjual: 20, harga: 8000 },
    { id: 9, nama: "Gorengan", kategori: "Snack", terjual: 30, harga: 2000 },
    { id: 10, nama: "Pukis", kategori: "Snack", terjual: 10, harga: 3000 }
  ];

  const dataPromo = [
    { emoji: "🍜", nama: "Senin Hemat", ket: "Mie Ayam cuma Rp7.000", tag: "SENIN", color: "blue" },
    { emoji: "🍳", nama: "Paket Sarapan", ket: "Nasi Uduk + Es Teh Rp9.000", tag: "SETIAP HARI", color: "yellow" },
    { emoji: "🍌", nama: "Menu Baru", ket: "Pisang Goreng Coklat", tag: "MINGGU INI", color: "teal" },
    { emoji: "💧", nama: "Jumat Berkah", ket: "Air mineral gratis tiap beli makanan", tag: "JUMAT", color: "red" }
  ];

  const dataDailyChart = {
    labels: ["Sab, 17", "Min, 18", "Sen, 19", "Sel, 20", "Rab, 21", "Kam, 22", "Jum, 23"],
    values: [220000, 160000, 195000, 218000, 190000, 152000, 255000]
  };

  // ==========================================
  // 2. RENDERING KPI & INFORMASI ATAS
  // ==========================================
  function updateKPI() {
    let totalOmzet = 0;
    let totalItem = 0;

    dataProduk.forEach(item => {
      totalOmzet += item.terjual * item.harga;
      totalItem += item.terjual;
    });

    const totalTrx = 21;

    document.getElementById("kOmzet").innerText = "Rp" + totalOmzet.toLocaleString("id-ID");
    document.getElementById("cOmzet").innerText = "Rata-rata Rp" + Math.round(totalOmzet / 7).toLocaleString("id-ID") + " per hari";

    document.getElementById("kItem").innerText = totalItem;
    document.getElementById("cItem").innerText = "Dari " + dataProduk.length + " produk yang laku";

    document.getElementById("kTrx").innerText = totalTrx;
    document.getElementById("cTrx").innerText = "Dalam 7 hari";

    document.getElementById("dRange").innerText = "17 Okt 2026 - 23 Okt 2026 · 3 kategori · " + dataProduk.length + " produk";
  }
  updateKPI();

  // ==========================================
  // 3. FLATPICKR (Pemilih Tanggal)
  // ==========================================
  flatpickr("#fDate", {
    mode: "range",
    dateFormat: "d M Y",
    defaultDate: ["2026-10-17", "2026-10-23"],
    locale: "id"
  });

  // ==========================================
  // 4. TOM SELECT (Kategori Multi-select)
  // ==========================================
  new TomSelect("#fKat", {
    plugins: ['remove_button'],
    options: [
      { value: 'Makanan', text: 'Makanan' },
      { value: 'Minuman', text: 'Minuman' },
      { value: 'Snack', text: 'Snack' }
    ],
    items: ['Makanan', 'Minuman', 'Snack'],
    placeholder: 'Pilih kategori...'
  });

  // ==========================================
  // 5. FLOATING UI (Tooltip Info KPI)
  // ==========================================
  const tooltipEl = document.getElementById("tooltip");
  document.querySelectorAll(".icon-btn[data-tip]").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      const text = btn.getAttribute("data-tip");
      tooltipEl.textContent = text;
      tooltipEl.style.opacity = "1";

      FloatingUI.computePosition(btn, tooltipEl, {
        placement: "top",
        middleware: [FloatingUI.offset(6), FloatingUI.shift({ padding: 5 })]
      }).then(({ x, y }) => {
        Object.assign(tooltipEl.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    });

    btn.addEventListener("mouseleave", () => {
      tooltipEl.style.opacity = "0";
    });
  });

  // ==========================================
  // 6. CHART.JS (Grafik Batang & Donat)
  // ==========================================
  const ctxBar = document.getElementById("cBar").getContext("2d");
  new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: dataDailyChart.labels,
      datasets: [{
        data: dataDailyChart.values,
        backgroundColor: "#357DE8",
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          ticks: { callback: value => (value / 1000) + "rb" },
          grid: { color: "rgba(0,0,0,0.05)" }
        },
        x: { grid: { display: false } }
      }
    }
  });

  const ctxDn = document.getElementById("cDn").getContext("2d");
  new Chart(ctxDn, {
    type: "doughnut",
    data: {
      labels: ["Makanan", "Minuman", "Snack"],
      datasets: [{
        data: [84, 91, 86],
        backgroundColor: ["#357DE8", "#82B536", "#BF63F3"],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { usePointStyle: true, boxWidth: 8 }
        }
      },
      cutout: "75%"
    }
  });

  // ==========================================
  // 7. TABULATOR & SWEETALERT2 (Tabel Produk)
  // ==========================================
  document.getElementById("tCount").innerText = dataProduk.length + " produk";

  const tableData = dataProduk.map(item => ({
    ...item,
    omzet: item.terjual * item.harga
  }));

  new Tabulator("#tProd", {
    data: tableData,
    layout: "fitColumns",
    columns: [
      {
        title: "Produk",
        field: "nama",
        headerFilter: "input",
        headerFilterPlaceholder: "Cari produk..."
      },
      {
        title: "Kategori",
        field: "kategori",
        formatter: cell => {
          const val = cell.getValue();
          let color = "blue";
          if (val === "Minuman") color = "green";
          if (val === "Snack") color = "purple";
          return `<span class="lozenge ${color}">${val}</span>`;
        }
      },
      { title: "Terjual", field: "terjual", hozAlign: "right", cssClass: "num" },
      {
        title: "Omzet",
        field: "omzet",
        hozAlign: "right",
        cssClass: "num",
        formatter: cell => "Rp" + cell.getValue().toLocaleString("id-ID")
      },
      {
        title: "",
        formatter: () => `<button class="icon-btn del" type="button" title="Hapus"><svg class="ic" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>`,
        width: 40,
        hozAlign: "center",
        cellClick: (e, cell) => {
          const row = cell.getRow();
          const rowData = row.getData();

          Swal.fire({
            title: "Hapus produk?",
            text: `Apakah Anda yakin ingin menghapus "${rowData.nama}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#AE2E24",
            cancelButtonColor: "#505258",
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal"
          }).then(result => {
            if (result.isConfirmed) {
              row.delete();
              Swal.fire({
                title: "Terhapus!",
                text: `${rowData.nama} berhasil dihapus.`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
              });
            }
          });
        }
      }
    ]
  });

  // ==========================================
  // 8. LIST PROMO MINGGU INI
  // ==========================================
  document.getElementById("pCount").innerText = dataPromo.length + " aktif";
  const promoContainer = document.getElementById("promo");

  dataPromo.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="p-emoji">${item.emoji}</div>
      <div class="p-body">
        <b>${item.nama}</b>
        <small>${item.ket}</small>
      </div>
      <span class="lozenge ${item.color}">${item.tag}</span>
    `;
    promoContainer.appendChild(li);
  });

  // ==========================================
  // 9. TOGGLE MODE GELAP / TERANG
  // ==========================================
  const btnTheme = document.getElementById("btnTheme");
  btnTheme.addEventListener("click", () => {
    const currentMode = document.documentElement.getAttribute("data-color-mode");
    const nextMode = currentMode === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-color-mode", nextMode);
    localStorage.setItem("kantin-color-mode", nextMode);
  });
});
