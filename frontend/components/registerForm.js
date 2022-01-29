import Swal from "sweetalert2";

function registerForm() {
  Swal.fire({
    title: "Register Your ETH Address",
    html: `<input type="text" id="name" class="swal2-input" placeholder="Your Full Name">
        <input type="text" id="email" class="swal2-input" placeholder="Your email address">
        <input type="text" id="phoneNumber" class="swal2-input" placeholder="Your Phone Number">
        <input type="password" id="walletAddress" class="swal2-input" placeholder="Your ETH address">`,
    confirmButtonText: "Register",
    focusConfirm: false,
    preConfirm: () => {
      const name = Swal.getPopup().querySelector("#name").value;
      const email = Swal.getPopup().querySelector("#email").value;
      const phoneNumber = Swal.getPopup().querySelector("#phoneNumber").value;
      const walletAddress = Swal.getPopup().querySelector("#email").value;
      if (!name || !email || !phoneNumber || !walletAddress) {
        Swal.showValidationMessage(`Please enter the missing field(s)`);
      }
      return {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        walletAddress: walletAddress,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(
        "/api/register?name=${name}&email=${email}&phoneNumber=${phoneNumber}&walletAddress=${walletAddress}"
      )
        .then((response) => {
          if (response.ok) {
            Swal.fire("You have been registered !");
          } else {
            Swal.fire("An error occured");
          }
        })
        .catch((error) => {
          Swal.fire("We have encountered an error: ${error}");
        });
    }
  });
}

export default registerForm;
