// Client facing scripts here
$(() => {
  $('#logoutbtn').on('click', () => {
    $.ajax({
      method: 'POST',
      url: '/logout'
    });
  });
});
