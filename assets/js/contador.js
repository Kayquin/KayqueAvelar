function iniciarContador() {
    let tempoRestante = 30 * 60; // 30 minutos em segundos
    let contador = document.getElementById("contador");

    function atualizarContador() {
        let minutos = Math.floor(tempoRestante / 60);
        let segundos = tempoRestante % 60;
        contador.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
        if (tempoRestante > 0) {
            tempoRestante--;
            setTimeout(atualizarContador, 1000);
        } else {
            contador.textContent = "Expirado!";
        }
    }
    atualizarContador();
}

iniciarContador();