$("#registerForm").on("submit", function (e) {
  e.preventDefault();

  // Xóa thông báo lỗi cũ
  $(".error").text("");

  let isValid = true;
  let fullname = $("#fullname").val().trim();
  let email = $("#email").val().trim();
  let password = $("#password").val().trim();

  // Kiểm tra họ tên
  if (fullname === "") {
    $("#fullnameError").text("Họ tên không được để trống");
    isValid = false;
  }

  // Kiểm tra email đơn giản
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    $("#emailError").text("Email không hợp lệ");
    isValid = false;
  }

  // Kiểm tra mật khẩu
  if (password.length < 6) {
    $("#passwordError").text("Mật khẩu phải có ít nhất 6 ký tự");
    isValid = false;
  }

  if (isValid) {
    // Gọi AJAX ở bước tiếp theo
    submitFormAJAX(fullname, email, password);
  }
});
function submitFormAJAX(fullname, email, password) {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts", // API giả lập
    type: "POST",
    data: {
      fullname: fullname,
      email: email,
      password: password,
    },
    success: function (response) {
      console.log("Response:", response);
      $("#registerForm").slideUp(500, function () {
        $("#successMessage").fadeIn();
      });
    },
    error: function () {
      alert("Server bận, vui lòng thử lại sau.");
    },
  });
}
