$(() => {
	const $search = $('#search');
	const $list = $('#list');
	
	const input$ = Rx.Observable.fromEvent($search, 'input');

	input$
	.map(e => e.target.value)
	.filter(text => text.length > 2)
	.debounceTime(200)
	.switchMap(getUsers)
	.pluck('items')
	.subscribe((data) => {
		$list.html(data.map(d => '<li>' + d.login + '</li>'));
	})
});

function getUsers(text) {
	const response = fetch('https://api.github.com/search/users?q=' + text).then(resp => resp.json());
	return Rx.Observable.fromPromise(response);
};