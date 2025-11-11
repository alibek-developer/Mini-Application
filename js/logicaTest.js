// HTML elementlarini tanlab olamiz
// const daqiqalarElement = document.getElementById('daqiqalar') // YANGI
// const soniyaElement = document.getElementById('soniya')
// const millisoniyaElement = document.getElementById('millisoniya')
// const statusText = document.getElementById('status-matn')
// const boshlashButton = document.getElementById('boshlash-tugmasi')

let jamiMillisoniyalar = 0
let intervalId
let ishlayapti = false

// --- Vaqtni Hisoblash va Yangilash Funksiyasi (Endi Soat va Daqiqalar bilan) ---
function yangilash() {
	// Har 10 ms da chaqiriladi
	jamiMillisoniyalar = jamiMillisoniyalar + 10

	// 1. Umumiy millisoniyalardan BARCHA SONIYALARni hisoblash
	let jamiSoniyalar = Math.floor(jamiMillisoniyalar / 1000)

	// 2. Soatlarni hisoblash

	// 3. Daqiqalarni hisoblash
	// Qolgan soniyalarni (3600 ga bo'lingandan keyingi qoldiq) 60 ga bo'lish
	const daqiqalar = Math.floor((jamiSoniyalar % 3600) / 60)

	// 4. Soniyalarni hisoblash
	// Qolgan daqiqalarni (60 ga bo'lingandan keyingi qoldiq) soniya sifatida olish
	const soniyalar = jamiSoniyalar % 60

	// 5. Millisoniyalarni hisoblash
	const millisoniyalar = (jamiMillisoniyalar % 1000) / 10

	// --- Formatlash (padStart bilan ikki xonali qilish) ---
	const daqiqaStr = String(daqiqalar).padStart(2, '0')
	const soniyaStr = String(soniyalar).padStart(2, '0')
	const msStr = String(millisoniyalar).padStart(2, '0')

	// HTML-ni yangilash
	daqiqalarElement.textContent = daqiqaStr // YANGI
	soniyaElement.textContent = soniyaStr
	millisoniyaElement.textContent = msStr
}

// --- To'xtatish (Pauza) Funksiyasi ---
function toxtatish() {
	clearInterval(intervalId)
	ishlayapti = false

	statusText.textContent = "Sekundomer to'xtatilgan"
	boshlashButton.innerHTML = `<i class="fa-solid fa-play"></i> Boshlash`
	boshlashButton.classList.add('from-purple-600', 'to-blue-500')
	boshlashButton.classList.remove(
		'bg-red-600',
		'to-red-600',
		'from-red-600',
		'bg-gradient-to-r'
	)

	console.log("Sekundomer to'xtatildi.")
}

// --- Boshlash Funksiyasi (Start/Pause vazifasini bajaradi) ---
function boshlash() {
	if (ishlayapti) {
		toxtatish()
	} else {
		intervalId = setInterval(yangilash, 10)
		ishlayapti = true

		statusText.textContent = 'Sekundomer ishlamoqda'

		boshlashButton.innerHTML = `<i class="fa-solid fa-pause"></i> To'xtatish`
		boshlashButton.classList.remove('from-purple-600', 'to-blue-500')
		boshlashButton.classList.add(
			'bg-red-600',
			'bg-gradient-to-r',
			'from-red-600',
			'to-red-600'
		)

		console.log('Sekundomer ishga tushirildi.')
	}
}

// --- Qayta O'ynatish (Reset) Funksiyasi ---
function qaytaOynatish() {
	toxtatish() // Avval to'xtatamiz
	jamiMillisoniyalar = 0 // Sanoqni nolga o'rnatamiz

	// HTML-ni nolga o'rnatish
	daqiqalarElement.textContent = '00'
	soniyaElement.textContent = '00'
	millisoniyaElement.textContent = '00'
	statusText.textContent = 'Sekundomer qayta boshlandi'

	console.log('Sekundomer nollandi.')
}
