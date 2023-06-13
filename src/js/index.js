function showAlert() {
    alert("Hola esta es una alerta desde JavaScript")
}

window.addEventListener('scroll', function () {
    const header = this.document.getElementById("navbar")
    header.classList.toggle("sticky", this.window.scrollY > 0)
})

document.querySelector("button.button-menu-toggle")
    .addEventListener("click", function () {
        document.getElementById("menu-cortina").style.display = "block"
        document.getElementById("navbar-responsive").style.display = "block"
        document.getElementsByTagName("body")[0].style.overflow = "hidden"
    })

document.getElementById("navbar-responsive-button").addEventListener("click", function () {
    document.getElementById("menu-cortina").style.display = "none"
    document.getElementById("navbar-responsive").style.display = "none"
    document.getElementsByTagName("body")[0].style.overflow = "auto"

})
