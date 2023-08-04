const init = () => {
	document.querySelector('.test').addEventListener('click', e => {
		console.log(e.currentTarget)
		e.currentTarget.style.color = 'red'
	})
}

document.addEventListener('DOMContentLoaded', init)