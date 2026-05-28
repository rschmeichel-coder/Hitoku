let orders = JSON.parse(
  localStorage.getItem("orders")
) || []

let history = JSON.parse(
  localStorage.getItem("history")
) || []
function updateStats(){

  document.getElementById(
    "totalOrder"
  ).innerText =
    orders.length

  document.getElementById(
    "totalDone"
  ).innerText =
    history.length

  let revenue = 0

  history.forEach((item)=>{

    revenue += Number(item.total)

  })

  document.getElementById(
    "totalRevenue"
  ).innerText =
    "Rp " +
    revenue.toLocaleString()

}

let cancelHistory = JSON.parse(
  localStorage.getItem("cancelHistory")
) || []

function tampilkanOrder(){

  const orderList =
    document.getElementById("orderList")

  orderList.innerHTML = ""

  let totalMatcha = 0
  let totalBoba = 0

  orders.forEach((order) => {

    totalMatcha += Number(order.matcha)
    totalBoba += Number(order.boba)

  })

  orderList.innerHTML += `

    <div class="order-card">

      <h2>
        Ringkasan Order 🍵
      </h2>

      <p>
        Matcha Latte:
        ${totalMatcha}
      </p>

      <p>
        Matcha Latte + Boba:
        ${totalBoba}
      </p>

    </div>

  `

  orders.forEach((order, index) => {

    orderList.innerHTML += `

      <div class="order-card">

        <h3>
          ${order.nama}
        </h3>

        <p>
          No Telp:
          ${order.telp}
        </p>

        <p>
          Matcha Latte:
          ${order.matcha}
        </p>

        <p>
          Matcha Latte + Boba:
          ${order.boba}
        </p>

        <p>
          Total:
          Rp ${order.total.toLocaleString()}
        </p>

        ${
          order.bukti
          ?
          `
          <img
            src="${order.bukti}"
            style="
              width:250px;
              border-radius:15px;
              margin-top:15px;
              display:block;
            "
          >
          `
          :
          ""
        }

        <button
          onclick="selesaikanOrder(${index})"
        >
          ✅ Selesaikan
        </button>

        <button
          class="cancel-btn"
          onclick="cancelOrder(${index})"
        >
          ❌ Cancel
        </button>

      </div>

    `
  })

  tampilkanHistory()
  updateStats()
}

function selesaikanOrder(index){

  history.push(
    orders[index]
  )

  orders.splice(index,1)

  localStorage.setItem(
    "orders",
    JSON.stringify(orders)
  )

  localStorage.setItem(
    "history",
    JSON.stringify(history)
  )
  updateStats()
  tampilkanOrder()
}

function cancelOrder(index){

  const konfirmasi =
    confirm(
      "Yakin ingin membatalkan pesanan ini?"
    )

  if(!konfirmasi){
    return
  }

  cancelHistory.push(
    orders[index]
  )

  orders.splice(index,1)

  localStorage.setItem(
    "orders",
    JSON.stringify(orders)
  )

  localStorage.setItem(
    "cancelHistory",
    JSON.stringify(cancelHistory)
  )
  updateStats()
  tampilkanOrder()
}

function tampilkanHistory(){

  const historyList =
    document.getElementById("historyList")

  historyList.innerHTML = ""

  historyList.innerHTML += `
    <h2 style="
      margin-bottom:20px;
      color:#4D6B3C;
    ">
      History Selesai ✅
    </h2>
  `

  history.forEach((item) => {

    historyList.innerHTML += `

      <div class="history-card">

        <h3>
          ${item.nama}
        </h3>

        <p>
          DONE ✅
        </p>

      </div>

    `
  })

  historyList.innerHTML += `
    <h2 style="
      margin-top:40px;
      margin-bottom:20px;
      color:#dc2626;
    ">
      History Cancel ❌
    </h2>
  `

  cancelHistory.forEach((item) => {

    historyList.innerHTML += `

      <div class="history-card">

        <h3>
          ${item.nama}
        </h3>

        <p>
          CANCEL ❌
        </p>

      </div>

    `
  })
}

function clearHistory(){

  const konfirmasi =
    confirm(
      "Yakin mau hapus semua history?"
    )

  if(konfirmasi){

    history = []
    cancelHistory = []

    localStorage.setItem(
      "history",
      JSON.stringify(history)
    )

    localStorage.setItem(
      "cancelHistory",
      JSON.stringify(cancelHistory)
    )

    tampilkanHistory()
  }
}

tampilkanOrder()
updateStats()