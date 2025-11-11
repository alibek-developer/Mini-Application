module.exports = {
	theme: {
		extend: {
			keyframes: {
				spin: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'spin-reverse': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(-360deg)' },
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
			},
			animation: {
				spin: 'spin 1s linear infinite',
				'spin-reverse': 'spin-reverse 0.5s linear infinite',
				'spin-slow': 'spin-slow 1.5s linear infinite',
			},
		},
	},
}
