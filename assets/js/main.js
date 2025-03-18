/*
	Kayque Avelar
	
*/

// Validação do formulário
document.getElementById("contact-form").addEventListener("submit", function (event) {
	event.preventDefault(); // Impede o envio padrão do formulário

	let name = document.getElementById("name").value.trim();
	let email = document.getElementById("email").value.trim();
	let tel = document.getElementById("tel").value.trim();
	let message = document.getElementById("message").value.trim();
	let errorMessage = document.getElementById("error-message");
	let loading = document.getElementById("loading");
	let submitButton = document.getElementById("submit-button");

	if (name === "" || email === "" || tel === "" || message === "") {
		errorMessage.textContent = "Por favor, preencha todos os campos!";
		return;
	}

	errorMessage.textContent = ""; // Limpa mensagem de erro
	loading.style.display = "block"; // Exibe a tela de carregamento
	submitButton.disabled = true; // Desativa o botão de envio

	// Criando um formulário para envio via AJAX
	let formData = new FormData();
	formData.append("Nome", name);
	formData.append("Email", email);
	formData.append("Telefone", tel);
	formData.append("message", message);
	formData.append("_subject", "Nova Mensagem!");
	formData.append("_honey", ""); // Proteção contra bots
	formData.append("_captcha", "false");

	fetch("https://formsubmit.co/kayque9868@gmail.com", {
		method: "POST",
		body: formData
	})
		.then(response => {
			if (response.ok) {
				return response.text(); // Converte a resposta para texto (evita erro no JSON)
			}
			throw new Error("Erro no envio. Tente novamente.");
		})
		.then(() => {
			loading.textContent = "Formulário enviado com sucesso!";
			setTimeout(() => {
				loading.style.display = "none";
				submitButton.disabled = false;
				document.getElementById("contact-form").reset();
			}, 2000);
		})
		.catch(error => {
			console.error("Erro no envio:", error);
			loading.textContent = "Erro ao enviar. Tente novamente.";
			setTimeout(() => {
				loading.style.display = "none";
				submitButton.disabled = false;
			}, 3000);
		});
});

//

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
			parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
			parallaxFactor: 20

		};

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1800px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px'],
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch?
	if (browser.mobile) {

		// Turn on touch mode.
		$body.addClass('is-touch');

		// Height fix (mostly for iOS).
		window.setTimeout(function () {
			$window.scrollTop($window.scrollTop() + 1);
		}, 0);

	}

	// Footer.
	breakpoints.on('<=medium', function () {
		$footer.insertAfter($main);
	});

	breakpoints.on('>medium', function () {
		$footer.appendTo($header);
	});

	// Header.

	// Parallax background.

	// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
	if (browser.name == 'ie'
		|| browser.mobile)
		settings.parallax = false;

	if (settings.parallax) {

		breakpoints.on('<=medium', function () {

			$window.off('scroll.strata_parallax');
			$header.css('background-position', '');

		});

		breakpoints.on('>medium', function () {

			$header.css('background-position', 'left 0px');

			$window.on('scroll.strata_parallax', function () {
				$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
			});

		});

		$window.on('load', function () {
			$window.triggerHandler('scroll');
		});

	}

	// Main Sections: Two.

	// Lightbox gallery.
	$window.on('load', function () {

		$('#two').poptrox({
			caption: function ($a) { return $a.next('h3').text(); },
			overlayColor: '#2c2c2c',
			overlayOpacity: 0.85,
			popupCloserText: '',
			popupLoaderText: '',
			selector: '.work-item a.image',
			usePopupCaption: true,
			usePopupDefaultStyling: false,
			usePopupEasyClose: false,
			usePopupNav: true,
			windowMargin: (breakpoints.active('<=small') ? 0 : 50)
		});

	});
})(jQuery);