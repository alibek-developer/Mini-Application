window.addEventListener('DOMContentLoaded', () => {
	// Tasks
	const input = document.querySelector('#tasks_input'),
		btn = document.querySelector('#tasks_btn'),
		tasksWrapper = document.querySelector('#tasks_wrapper'),
		totalSpan = document.querySelector('#total-tasks'),
		comletedSpan = document.querySelector('#completed-tasks')

	function updateStats() {
		const total = tasksWrapper.children.length

		const completed = tasksWrapper.querySelectorAll(
			'input[type="checkbox"]:checked'
		).length

		totalSpan.textContent = total
		comletedSpan.textContent = completed
	}

	function addTasks() {
		const text = input.value.trim()

		if (!text) {
			alert('Bir narsa yozish garak')
			return
		}

		const task = document.createElement('div')

		task.className =
			'flex items-center justify-between bg-gray-900 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors'
		task.innerHTML = `
   <div class="flex items-center space-x-3">
      <input type="checkbox" class="w-5 h-5 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500">
      <span class="text-sm font-medium">${text}</span>
    </div>
    <button class="text-gray-400 hover:text-red-500 transition-colors delete-btn">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
`
		task.querySelector('.delete-btn').addEventListener('click', () => {
			task.remove()
			updateStats()
		})

		task
			.querySelector('input[type="checkbox"]')
			.addEventListener('change', updateStats)

		tasksWrapper.appendChild(task)

		input.value = ''
		input.focus()

		updateStats()
	}

	btn.addEventListener('click', addTasks)

	updateStats()
	// Timer
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
