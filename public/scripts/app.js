$(() => {
  const increaseBtn = $('.Fries')
  increaseBtn.click(function () {
      console.log('inrease button works!')
      console.log(increaseBtn.attr('class'))
      fetch('/addItem/4', { method: 'POST', body:})
  })
})
