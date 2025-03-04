document.addEventListener("DOMContentLoaded", async () => {
    const terminalLines = document.querySelectorAll(".loadingText");
    const terminal = document.querySelector(".terminal");

    function typeText(element, text, callback) {
        let i = 0;
        let interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1) + "<span class='cursor'></span>";
                i++;
                // terminal.scrollTop = terminal.scrollHeight;
            } else {
                clearInterval(interval);
                element.innerHTML = text;
                if (callback) setTimeout(callback, 300);
            }
        }, 20);
    }

    function showLines(index = 0) {
        if (index < terminalLines.length) {
            let line = terminalLines[index];
            let text = line.innerText;
            line.innerText = "";
            line.style.opacity = "1";
            typeText(line, text, () => showLines(index + 1));
        }
    }

    terminalLines.forEach(line => line.style.opacity = "0");
    await showLines();
    setTimeout(() => {
        window.location.href = "planet";
    }, 8000);
});
