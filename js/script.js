window.addEventListener('DOMContentLoaded', () => {
	// --- Global o'zgaruvchilar ---
	let jamiMillisoniyalar = 0 // Umumiy o'tgan millisoniya vaqtini saqlash
	let intervalId
	let ishlayapti = false // Taymerning joriy holati (true: ishlayapti, false: to'xtagan)

	const minutesElement = document.querySelector('#minutes')
	const secondsElement = document.querySelector('#seconds')
	const millisecondsElement = document.querySelector('#milliseconds')
	const statusText = document.querySelector('#status-matn')
	const startBtn = document.querySelector('#boshlash-tugmasi')

	function updateTimer() {
		jamiMillisoniyalar = jamiMillisoniyalar + 10

		const jamiSoniyalar = Math.floor(jamiMillisoniyalar / 1000)

		const minutes = Math.floor(jamiSoniyalar / 60)
		const seconds = jamiSoniyalar % 60
		const milliseconds = (jamiMillisoniyalar % 1000) / 10

		const minutesStr = String(minutes).padStart(2, '0')
		const secondsStr = String(seconds).padStart(2, '0')
		const millisecondsStr = String(milliseconds).padStart(2, '0')

		minutesElement.textContent = minutesStr
		secondsElement.textContent = secondsStr
		millisecondsElement.textContent = millisecondsStr
	}

	function boshlash() {
		if (ishlayapti) {
			toStop()
		} else {
			intervalId = setInterval(updateTimer, 10) // Har 10 ms da yangilash
			ishlayapti = true

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

	function toStop() {
		clearInterval(intervalId)
		ishlayapti = false

		statusText.textContent = "Sekundomer to'xtatilgan"

		startBtn.innerHTML = `<i class="fa-solid fa-play"></i> Boshlash`

		startBtn.classList.add('bg-gradient-to-r', 'from-purple-600', 'to-blue-500')
		startBtn.classList.remove('bg-red-600', 'from-red-600', 'to-red-600')

		console.log("Sekundomer to'xtatildi.")
	}

	function resetTimer() {
		toStop()
		jamiMillisoniyalar = 0

		minutesElement.textContent = '00'
		secondsElement.textContent = '00'
		millisecondsElement.textContent = '00'

		statusText.textContent = 'Sekundomer qayta boshlandi'

		console.log('Sekundomer nollandi.')
	}

	boshlash()
	resetTimer()
})
