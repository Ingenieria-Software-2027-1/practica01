const loadAnimations = () => {
    const hangulElement = document.getElementById("hangul-hover");

    hangulElement.onmouseover = (e) => {
        e.preventDefault();
        hangulElement.innerText = "한글"
    }

    hangulElement.onmouseout = (e) => {
        e.preventDefault
        hangulElement.innerText = "hangul"
    }
}

window.onload = _ => loadAnimations();