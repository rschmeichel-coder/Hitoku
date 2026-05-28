const supabaseUrl =
"https://czxcnerqqylegzftkuqz.supabase.co"

const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6eGNuZXJxcXlsZWd6ZnRrdXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NjQwNDYsImV4cCI6MjA5NTQ0MDA0Nn0.AZCWjMXaZkJjJeXAupOXkk40g5K1cq9xfSk6jYBZ7zg"

const supabase =
window.supabase.createClient(
  supabaseUrl,
  supabaseKey
)
function pesanSekarang(){

  const nama =
    document.getElementById("nama").value

  const telp =
    document.getElementById("telp").value

  const matcha =
    Number(
      document.getElementById("matcha").value
    )

  const boba =
    Number(
      document.getElementById("boba").value
    )

  if(
    nama == "" ||
    telp == ""
  ){
    alert("Isi nama dan nomor dulu")
    return
  }

  if(
    matcha == 0 &&
    boba == 0
  ){
    alert("Pilih minimal 1 minuman")
    return
  }

  /* HARGA */

  const total =
    (matcha * 20000) +
    (boba * 25000)

  /* SIMPAN ORDER */

  pendingOrder = {
  nama,
  telp,
  matcha,
  boba,
  total
}

  /* TAMPILKAN TOTAL */

  document.getElementById(
    "totalHarga"
  ).innerText =
    "Total: Rp " +
    total.toLocaleString()

  /* POPUP */

  document.getElementById(
    "paymentPopup"
  ).style.display = "flex"
}

function closePopup(){

  document.getElementById(
    "paymentPopup"
  ).style.display = "none"
}
let pendingOrder = null;
function kirimPesanan(){

  const file =
    document.getElementById(
      "buktiTransfer"
    ).files[0]

  if(!file){
    alert(
      "Upload bukti transfer dulu"
    )
    return
  }

  const reader =
    new FileReader()

  reader.onload = function(e){

    pendingOrder.bukti =
      e.target.result

    async function loadOrders(){

        const { data } =
        await supabase
          .from("orders")
          .select("*")
          .eq("status","pending")

        orders = data

        tampilkanOrder()
      }
      []

        await supabase
    .from("orders")
    .insert([
      {
        nama,
        telp,
        matcha,
        boba,
        total,
        bukti
      }
])

    alert(
      "Pesanan berhasil dikirim"
    )

    closePopup()
  }

  reader.readAsDataURL(file)
}
document
  .getElementById("buktiTransfer")
  ?.addEventListener("change", function(){

    const file =
      this.files[0]

    if(file){

      document.getElementById(
        "fileName"
      ).innerText =
        file.name

    }

})