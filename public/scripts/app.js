$(() => {
  $('.myMessage').hide();
 // const increaseBtn = $('.Fries')
 // increaseBtn.click(function () {
 //     console.log('inrease button works!')
 //     console.log(increaseBtn.attr('class'))
 //     fetch('/addItem/4', { method: 'POST', body:})
 // })

 async function postData(url = "", data = {}) {
   // Default options are marked with *
   const response = await fetch(url, {
     method: "POST", // *GET, POST, PUT, DELETE, etc.
     mode: "cors", // no-cors, *cors, same-origin
     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
     credentials: "same-origin", // include, *same-origin, omit
     headers: {
       "Content-Type": "application/json",
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
     redirect: "follow", // manual, *follow, error
     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
     body: JSON.stringify(data), // body data type must match "Content-Type" header
   });
   return response.json(); // parses JSON response into native JavaScript objects
 }

 $("#checkoutBtn").on("click", (event) => {
    // event.preventDefault();

    let orderItems = document.getElementsByClassName("items");
    if(orderItems.length > 0){
      postData("/cart/sendSMS", {}).then((data) => {
           //window.location = '/orderPlaced';
           $('.myMessage').show();
           console.log(data); // JSON data parsed by `data.json()` call
           $('#checkoutBtn').prop("disabled", true);
         });
    } else {
      alert('Please add Items!')
    }


 });

// Conform order

$("#confirm_time_est_btn").on("click", (event) => {
   event.preventDefault();
   let time = document.getElementById("time_est").value;
     postData("/cart/confirm_order", {time_est:time}).then((data) => {
       console.log(data); // JSON data parsed by `data.json()` call
       $('#confirm_time_est_btn').prop("disabled", true);
   });

})



$("#order_done_btn").on("click", (event) => {
 event.preventDefault();
 let orderId = document.getElementById('order_Id').innerText.trim()
 postData("/cart/completed", {orderId: orderId}).then((data) => {
  $('#confirm_time_est_btn').prop("disabled", true);
  $('#order_done_btn').prop("disabled", true);
   console.log(data);

 });

})

});
