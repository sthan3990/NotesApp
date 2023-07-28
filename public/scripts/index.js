// Client facing scripts here
$(() => {
  $('#newtaskbtn').on('click', () => {
    $.ajax({
      method: 'POST',
      url: '/gotochat'
    });
  });
});
