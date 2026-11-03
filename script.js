console.log("=== Library Dashboard Script ===");
// sweetalert js script
const $favoriteButton = document.querySelector(".favorite-button");
$favoriteButton.addEventListener("click", () => {
    // Swal.fire("SweetAlert2 is working!");
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
});

// floating ui js script
const { computePosition, autoUpdate, offset, flip, shift } = window.FloatingUIDOM;
const $infoBtn = document.querySelector("#info-btn");
const $tip = document.querySelector("#tip");
let stopAutoUpdate = null;

function updateTip() {
    computePosition($infoBtn, $tip, {
        placement: "top",
        middleware: [offset(8), flip(), shift({ padding: 8 })]
    }).then(({ x, y }) => {
        Object.assign($tip.style, { left: `${x}px`, top: `${y}px` });
    });
}

function showTip() {
    $tip.classList.add("show");
    stopAutoUpdate = autoUpdate($infoBtn, $tip, updateTip);
}

function hideTip() {
    $tip.classList.remove("show");
    if (stopAutoUpdate) {
        stopAutoUpdate();
        stopAutoUpdate = null;
    }
}

[["mouseenter", showTip], ["mouseleave", hideTip], ["focus", showTip], ["blur", hideTip]]
    .forEach(([event, handler]) => $infoBtn.addEventListener(event, handler));

// tom select js script
const $kategoriResult = document.querySelector("#kategori-result");
new TomSelect("#kategori",{
    plugins: ['remove_button'],
    placeholder: "Pilih kategori...",
	persist: false,
	createOnBlur: true,
	create: true,
    onChange(values) {
        $kategoriResult.textContent = values.length !== 0
            ? `Dipilih: ${values.join(", ")}`
            : "Belum ada pilihan";
    }
});

// flatpickr js script
flatpickr('#tanggal', {
    // enableTime: true, // aktifkan time picker, klo mode range matiin
    mode: "range",
    // Y = year, m = month, d = day, H = hour, i = minute
    // M = month name, F = month name in short
    // dateFormat: "d-M-Y H:i",
    dateFormat: "d-M-Y", // klo mode range gk pke H:i
    locale: "id", // id, ru, ar
});

// chart js script
const ctx = document.getElementById('chart');
// bar chart example
// new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//         y: {
//             beginAtZero: true
//         }
//         }
//     }
// });
// doughnut chart example
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [
          'Ujang',
          'Budi',
          'Agung'
        ],
        datasets: [{
          label: 'Saldo $',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
    }
});

// tabulator js script
// define some sample data
var tabledata = [
 	{id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
 	{id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
 	{id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
 	{id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
 	{id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
    {id:6, name:"Lily May", age:"12", col:"red", dob:"20/05/1982"},
    {id:7, name:"Jone May", age:"12", col:"yellow", dob:"11/04/1982"},
    {id:8, name:"Budi May", age:"12", col:"green", dob:"14/09/1982`"},
    {id:9, name:"Sugeng May", age:"12", col:"blue", dob:"01/05/1992"},
    {id:10, name:"Suparti May", age:"12", col:"orange", dob:"02/05/2002"},
];

// create Tabulator on DOM element with id "tabel"
var table = new Tabulator("#tabel", {
 	height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
 	data:tabledata, //assign data to table
 	layout:"fitColumns", //fit columns to width of table (optional)
    pagination: true,
    paginationSize: 5,
 	columns:[ //Define Table Columns
	 	{title:"Name", field:"name", width:150, headerFilter: "input"},
	 	{title:"Age", field:"age", hozAlign:"left", formatter:"progress"},
	 	{title:"Favourite Color", field:"col"},
	 	{title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
 	],
});

// trigger an alert message when the row is clicked
table.on("rowClick", function(e, row){ 
	alert("Row " + row.getData().id + " Clicked!!!!");
});