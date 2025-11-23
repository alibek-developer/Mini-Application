// Tasks structure
// DOM elements
// updateStats() function ichida
// 1. wrapper bolalari soni
// 2. checked checkboxlar soni
// 3. total va completed ga yozish
// addTask() function ichida
// 	Ichida:
// 1. input qiymatini olish + trim
// 2. bo‘sh bo‘lsa → alert + return
// 3. <div> yaratish (vazifa konteyneri)
// 4. className berish
// 5. innerHTML orqali:
//    - checkbox
//    - span + input matni
//    - delete tugmasi (class="delete-btn")
// 6. delete tugmasiga click:
//    - ota elementni remove qilish
//    - updateStats chaqirish
// 7. checkboxga change:
//    - updateStats chaqirish
// 8. vazifani wrapperga qo‘shish
// 9. inputni bo‘shatish + focus
// 10. updateStats chaqirish
// btn.addEventListener('click', addTask)

// 1. Fon uchun qorong‘i HSL rang yaratish
function getRandomHSL() {
	const h = Math.floor(Math.random() * 360)
	const s = Math.floor(Math.random() * 51) + 40 // 40-90%
	const l = Math.floor(Math.random() * 16) + 8 // 8-23%
	return { h, s, l, hsl: `hsl(${h}, ${s}%, ${l}%)` }
}

// 2. Matn uchun yorqin HSL rang yaratish
function getRandomTextHSL() {
	const h = Math.floor(Math.random() * 360)
	const s = Math.floor(Math.random() * 41) + 60 // 60-100%
	const l = Math.floor(Math.random() * 26) + 70 // 70-95%
	return { h, s, l, hsl: `hsl(${h}, ${s}%, ${l}%)` }
}

// 3. HSL → HEX o‘tkazish
function hslToHex(h, s, l) {
	h /= 360
	s /= 100
	l /= 100
	let r, g, b
	if (s === 0) {
		r = g = b = l
	} else {
		const hue2rgb = (p, q, t) => {
			if (t < 0) t += 1
			if (t > 1) t -= 1
			if (t < 1 / 6) return p + (q - p) * 6 * t
			if (t < 1 / 2) return q
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
			return p
		}
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s
		const p = 2 * l - q
		r = hue2rgb(p, q, h + 1 / 3)
		g = hue2rgb(p, q, h)
		b = hue2rgb(p, q, h - 1 / 3)
	}
	const toHex = x => {
		const hex = Math.round(x * 255).toString(16)
		return hex.length === 1 ? '0' + hex : hex
	}
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

// 4. Barcha ranglarni yangilash
function generateColors() {
	const bg = getRandomHSL()
	const text = getRandomTextHSL()

	const bgHSL = bg.hsl
	const bgHEX = hslToHex(bg.h, bg.s, bg.l)
	const textHSL = text.hsl
	const textHEX = hslToHex(text.h, text.s, text.l)

	// sahifa
	document.getElementById('colors').style.backgroundColor = bgHSL
	document.getElementById('title-color').style.color = textHSL

	// birinchi tugma (fon)
	const firstP = document.querySelector('#first-btn p:nth-child(2)')
	firstP.textContent = bgHSL
	document.getElementById('first-btn').style.borderColor = textHSL
	document.getElementById('first-btn').style.color = textHSL

	// ikkinchi tugma (matn)
	const secondP = document.querySelector('#second-btn p:nth-child(2)')
	secondP.textContent = textHEX
	document.getElementById('second-btn').style.backgroundColor = textHSL
	document
		.querySelectorAll('#second-btn p')
		.forEach(p => (p.style.color = '#09090b'))

	// konsol
	console.clear()
	console.log('Fon (HSL):', bgHSL, '→', bgHEX)
	console.log('Matn (HEX):', textHEX, '→', textHSL)
}

// 5. Matnni clipboardga nusxalash
async function copyToClipboard(text) {
	try {
		await navigator.clipboard.writeText(text)
		showToast('Nusxalandi!')
	} catch (err) {
		showToast('Xato: ' + err.message, 'error')
	}
}

// 6. Bildirishnoma chiqarish
function showToast(message, type = 'success') {
	const div = document.createElement('div')
	div.textContent = message
	div.className = `fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl z-50 text-white font-bold animate-pulse ${
		type === 'success' ? 'bg-green-600' : 'bg-red-600'
	}`
	document.body.appendChild(div)
	setTimeout(() => div.remove(), 2000)
}

// 7. Event listenerlarni o‘rnatish
function setupEventListeners() {
	document
		.getElementById('random_colors')
		.addEventListener('click', generateColors)

	document.getElementById('first-btn').addEventListener('click', () => {
		const hsl = document.querySelector('#first-btn p:nth-child(2)').textContent
		copyToClipboard(hsl)
	})

	document.getElementById('second-btn').addEventListener('click', () => {
		const hex = document.querySelector('#second-btn p:nth-child(2)').textContent
		copyToClipboard(hex)
	})
}

// 8. Dasturni ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
	generateColors()
	setupEventListeners()
})
