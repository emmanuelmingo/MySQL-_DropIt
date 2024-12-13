function validateForm() {
    // Get the password and confirm password values
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    // Check if the passwords match
    if (password !== confirmPassword) {
        // Show error message if passwords do not match
        document.getElementById("error-message").style.display = "block";
        return false; // Prevent form submission
    }

    // Hide the error message if passwords match
    document.getElementById("error-message").style.display = "none";
    alert("Sign Up Successful!"); // You can replace this with form submission logic
    return true; // Allow form submission
}