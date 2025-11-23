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
	// Random Colors

	// Timer
	const minutesElement = document.querySelector('#minutes'),
		secondsElement = document.querySelector('#seconds'),
		millisecondsElement = document.querySelector('#milliseconds'),
		statusText = document.querySelector('#status-matn'),
		startBtn = document.querySelector('#boshlash-tugmasi'),
		resetBtn = document.querySelector('#reset')

	// --- Global o'zgaruvchilar ---
	let totalMillisecond = 0
	let intervalId
	let isWorking = false

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

	// Database

	class Database {
		constructor(title, subTitle, email, number, link, parentSelektor) {
			this.title = title
			this.subTitle = subTitle
			this.email = email
			this.number = number.replace(/[^0-9+x]/g, '')
			this.link = link.startsWith('http') ? link : 'https://' + link
			this.parent = document.querySelector(parentSelektor)
		}

		render() {
			const element = document.createElement('div')

			element.classList.add(
				'rounded-lg',
				'shadow-sm',
				'p-6',
				'transition-all',
				'hover:scale-105',
				'bg-[#141418]',
				'border',
				'border-[#2a1f3d]'
			)

			element.innerHTML = `
			<div class="space-y-4">
				<div>
					<h3 class="text-xl font-bold mb-1 text-white">${this.title}</h3>
					<p class="text-sm text-gray-400">${this.subTitle}</p>
				</div>
				<div class="space-y-2 border-t border-[#a1a1aa] pt-4">
					<div class="flex items-center gap-3 text-sm">
						<i class="fa-solid fa-envelope text-[#7246ba]"></i>
						<a href="mailto:${
							this.email
						}" class="hover:text-[#7246ba] transition-colors truncate text-gray-300">
							${this.email}
						</a>
					</div>
					<div class="flex items-center gap-3 text-sm">
						<i class="fa-solid fa-phone text-[#346ecd]"></i>
						<a href="tel:${
							this.number
						}" class="hover:text-[#346ecd] transition-colors text-gray-300">
							${this.number}
						</a>
					</div>
					<div class="flex items-center gap-3 text-sm">
						<i class="fa-solid fa-globe text-[#cc4476]"></i>
						<a href="${this.link}" target="_blank" rel="noopener" 
						   class="hover:text-[#cc4476] transition-colors truncate text-gray-300">
							${this.link.replace(/^https?:\/\//, '')}
						</a>
					</div>
				</div>
			</div>
		`

			this.parent.appendChild(element)
		}
	}

	const dataCards = [
		{
			title: 'Ervin Xouell',
			subTitle: 'Deckow-Crist',
			email: 'Shanna@melissa.tv',
			number: '010-692-6593 x09125',
			link: 'anastasia.net',
		},
		{
			title: 'Leanne Graham',
			subTitle: 'Romaguera-Crona',
			email: 'Sincere@april.biz',
			number: '1-770-736-8031 x56442',
			link: 'hildegard.org',
		},
		{
			title: 'Clementina DuBuque',
			subTitle: 'Hoeger LLC',
			email: 'Rey.Padberg@karina.biz',
			number: '1-463-123-4447',
			link: 'ramiro.info',
		},
		{
			title: 'Clementine Bauch',
			subTitle: 'Romaguera-Jacobson',
			email: 'Nathan@yesenia.net',
			number: '1-463-123-4447',
			link: 'ramiro.info',
		},
		{
			title: 'Patricia Lebsack',
			subTitle: 'Robel-Corkery',
			email: 'Julianne.OConner@kory.org',
			number: '493-170-9623 x156',
			link: 'kale.biz',
		},
		{
			title: 'Chelsey Dietrich',
			subTitle: 'Keebler LLC',
			email: 'Lucio_Hettinger@annie.ca',
			number: '(254)954-1289',
			link: 'demarco.info',
		},
		{
			title: 'Mrs. Dennis Schulist',
			subTitle: 'Considine-Lockman',
			email: 'Karley_Dach@jasper.info',
			number: '1-477-935-8478 x6430',
			link: 'ola.org',
		},
		{
			title: 'Kurtis Weissnat',
			subTitle: 'Johns Group',
			email: 'Telly.Hoeger@billy.biz',
			number: '210.067.6132',
			link: 'elvis.io',
		},
		{
			title: 'Nicholas Runolfsdottir ',
			subTitle: 'Abernathy Group',
			email: 'Sherwood@rosamond.me',
			number: '586.493.6943 x140',
			link: 'jacynthe.com',
		},
		{
			title: 'Glenna Reichert',
			subTitle: 'Yost and Sons',
			email: 'Chaim_McDermott@dana.io',
			number: '(775)976-6794 x41206',
			link: 'conrad.com',
		},
	]

	dataCards.forEach(dataCard => {
		new Database(
			dataCard.title,
			dataCard.subTitle,
			dataCard.email,
			dataCard.number,
			dataCard.link,
			'#database-cards'
		).render()
	})
})
