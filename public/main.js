// INPUTS / INTERACTIVE ELEMENTS
const deleteText = document.querySelectorAll('.fa-trash');
const thumbText = document.querySelectorAll('.fa-thumbs-up');

// EVENT LISTENERS AND FUNCTION CALLS
Array.from(deleteText).forEach((element) => {
	element.addEventListener('click', deleteRapper);
});

Array.from(thumbText).forEach((element) => {
	element.addEventListener('click', addLike);
});

// FUNCTIONS
async function deleteRapper() {
	// Stores the deleted stage name
	const sName = this.parentNode.childNodes[1].innerText;

	// Stores the deleted birth name
	const bName = this.parentNode.childNodes[3].innerText;

	try {
		const response = await fetch('deleteRapper', {
			method: 'delete',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				stageNameS: sName, // Sends deleted stage name to the API
				birthNameS: bName, // Sends deleted birth name to the API
			}),
		});

		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}

async function addLike() {
	// Stores the deleted stage name
	const sName = this.parentNode.childNodes[1].innerText;

	// Stores the deleted birth name
	const bName = this.parentNode.childNodes[3].innerText;

	// Stores the number of likes
	const tLikes = Number(this.parentNode.childNodes[5].innerText);

	try {
		const response = await fetch('addOneLike', {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				stageNameS: sName, // Sends deleted stage name to the API
				birthNameS: bName, // Sends deleted birth name to the API
				likesS: tLikes, // Sends number of likes to the API
			}),
		});

		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}
