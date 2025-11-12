window.addEventListener('DOMContentLoaded', () => {
	const minutesElement = document.querySelector('#minutes'),
		secondsElement = document.querySelector('#seconds'),
		millisecondsElement = document.querySelector('#milliseconds'),
		statusText = document.querySelector('#status-matn'),
		startBtn = document.querySelector('#boshlash-tugmasi'),
		resetBtn = document.querySelector('#reset')

	// --- Global o'zgaruvchilar ---
	let totalMillisecond = 0 // Umumiy o'tgan millisoniya vaqtini saqlash
	let intervalId
	let isWorking = false // Taymerning joriy holati (true: ishlayapti, false: to'xtagan)

	function updateTimer() {
		totalMillisecond = totalMillisecond + 10

		const totalSeconds = Math.floor(totalMillisecond / 1000)

		const minutes = Math.floor(totalSeconds / 60)
		const seconds = totalSeconds % 60
		const milliseconds = (totalMillisecond % 1000) / 10

		const minutesStr = String(minutes).padStart(2, '0')
		const secondsStr = String(seconds).padStart(2, '0')
		const millisecondsStr = String(milliseconds).padStart(2, '0')

		minutesElement.textContent = minutesStr
		secondsElement.textContent = secondsStr
		millisecondsElement.textContent = millisecondsStr
	}
	startBtn.addEventListener('click', () => {
		function boshlash() {
			if (isWorking) {
				toStop()
			} else {
				intervalId = setInterval(updateTimer, 10) // Har 10 ms da yangilash
				isWorking = true

				statusText.textContent = 'Sekundomer ishlamoqda'

				startBtn.innerHTML = `<i class="fa-solid fa-pause"></i> To'xtatish`

				startBtn.classList.remove('from-purple-600', 'to-blue-500')
				startBtn.classList.add(
					'bg-red-600',
					'bg-gradient-to-r',
					'from-red-600',
					'to-red-600'
				)
			}
		}
		boshlash()
	})

	function toStop() {
		clearInterval(intervalId)

		isWorking = false

		statusText.textContent = "Sekundomer to'xtatilgan"

		startBtn.innerHTML = `<i class="fa-solid fa-play"></i> Boshlash`

		startBtn.classList.add('bg-gradient-to-r', 'from-purple-600', 'to-blue-500')
		startBtn.classList.remove('bg-red-600', 'from-red-600', 'to-red-600')

		console.log("Sekundomer to'xtatildi.")
	}

	resetBtn.addEventListener('click', () => {
		function resetTimer() {
			toStop()
			totalMillisecond = 0

			minutesElement.textContent = '00'
			secondsElement.textContent = '00'
			millisecondsElement.textContent = '00'

			statusText.textContent = 'Sekundomer qayta boshlandi'

			console.log('Sekundomer nollandi.')
		}
		resetTimer()
	})
})
