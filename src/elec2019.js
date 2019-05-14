rootUrl = window.location.href;
rootUrl = rootUrl.replace('/regions/root.json', '');
root = JSON.parse(document.body.innerText);

window.senatorsList = [
	{ id: 1, name: "Abejo, Vangie", party: "IND" },
	{ id: 2, name: "Afuang, Abner", party: "WPP" },
	{ id: 3, name: "Aguilar, Freddie", party: "IND" },
	{ id: 4, name: "Albani, Shariff", party: "WPP" },
	{ id: 5, name: "Alejano, Gary", party: "LP" },
	{ id: 6, name: "Alfajora, Richard", party: "IND" },
	{ id: 7, name: "Alunan, Raffy", party: "BGMBYN" },
	{ id: 8, name: "Angara, Sonny", party: "LDP" },
	{ id: 9, name: "Aquino, Bam", party: "LP" },
	{ id: 10, name: "Arcega, Gerald", party: "WPP" },
	{ id: 11, name: "Arellano, Ernesto", party: "IND" },
	{ id: 12, name: "Arias, Marcelino", party: "WPP" },
	{ id: 13, name: "Austria, Bernard", party: "PDSP" },
	{ id: 14, name: "Baldevorana, Balde", party: "FPP" },
	{ id: 15, name: "Binay, Nancy", party: "UNA" },
	{ id: 16, name: "Bong Revilla, Ramon Jr", party: "LAKAS" },
	{ id: 17, name: "Caceres, Jesus", party: "IND" },
	{ id: 18, name: "Casino, Toti", party: "KDP" },
	{ id: 19, name: "Cayetano, Pia", party: "NP" },
	{ id: 20, name: "Chavez, Melchor", party: "WPP" },
	{ id: 21, name: "Chong, Glenn", party: "KDP" },
	{ id: 22, name: "Colmenares, Neri", party: "MKBYN" },
	{ id: 23, name: "De Guzman, Ka Leody", party: "PLM" },
	{ id: 24, name: "Dela Rosa, Bato", party: "PDPLBN" },
	{ id: 25, name: "Diokno, Chel", party: "LP" },
	{ id: 26, name: "Ejercito, Estrada JV", party: "NPC" },
	{ id: 27, name: "Enrile, Juan Ponce", party: "PMP" },
	{ id: 28, name: "Escudero, Agnes", party: "IND" },
	{ id: 29, name: "Estrada, Jinggoy", party: "PMP" },
	{ id: 30, name: "Francisco, Elmer", party: "PFP" },
	{ id: 31, name: "Gaddi, Charlie", party: "IND" },
	{ id: 32, name: "Gadon, Larry", party: "KBL" },
	{ id: 33, name: "Generoso, Gen Pederalismo", party: "IND" },
	{ id: 34, name: "Go, Bong Go", party: "PDPLBN" },
	{ id: 35, name: "Guigayuma, Junbert", party: "WPP" },
	{ id: 36, name: "Gutoc, Samira", party: "LP" },
	{ id: 37, name: "Hilbay, Pilo", party: "AKSYON" },
	{ id: 38, name: "Jangao, BFG Abraham", party: "IND" },
	{ id: 39, name: "Javellana, RJ", party: "KDP" },
	{ id: 40, name: "Lapid, Lito", party: "NPC" },
	{ id: 41, name: "Macalintal, Macaromy", party: "IND" },
	{ id: 42, name: "Mallillin, Emily", party: "IND" },
	{ id: 43, name: "Mangondato, Faisal", party: "IND" },
	{ id: 44, name: "Mangudadatu, Dong", party: "PDPLBN" },
	{ id: 45, name: "Manicad, Jiggy", party: "IND" },
	{ id: 46, name: "Marcos, Imee", party: "NP" },
	{ id: 47, name: "Matula, Jose Sonny", party: "WPP" },
	{ id: 48, name: "Meniano, Luther", party: "WPP" },
	{ id: 49, name: "Montano, Allan", party: "IND" },
	{ id: 50, name: "Nalliw, Joan Sheelah", party: "IND" },
	{ id: 51, name: "Ong, Doc Willie", party: "LAKAS" },
	{ id: 52, name: "Osmena, Serge", party: "IND" },
	{ id: 53, name: "Padilla, Dado", party: "PFP" },
	{ id: 54, name: "Pimentel, Koko", party: "PDPLBN" },
	{ id: 55, name: "Poe, Grace", party: "IND" },
	{ id: 56, name: "Roleda, Dan Kaibigan", party: "UNA" },
	{ id: 57, name: "Roxas, Mar", party: "LP" },
	{ id: 58, name: "Sahidulla, Lady Ann", party: "KDP" },
	{ id: 59, name: "Tanada, Lorenzo Erin Tapat", party: "LP" },
	{ id: 60, name: "Tolentino, Francis", party: "PDPLBN" },
	{ id: 61, name: "Valdes, Butch", party: "KDP" },
	{ id: 62, name: "Villar, Cynthia", party: "NP" }
];
window.senatorsLookup = {};
senatorsList.forEach(function (senator) {
	senatorsLookup[senator.id] = senator;
});

window.regionUrl = function regionUrl(url) {
	return rootUrl + '/regions/' + url + '.json';
};

window.resultUrl = function resultUrl(url) {
	return rootUrl + '/results/' + url + '.json';
};

window.fetchRegion = function fetchRegion(event, url) {
	event.preventDefault();
	fetch(url).then(response => response.json()
	).then(function (data) {
		obj = {
			raw: data,
			level: data.can,
			name: data.rn,
			url: regionUrl(data.url),
			subregions: Object.keys(data.srs).map(r => ({
				name: data.srs[r].rn,
				level: data.srs[r].can,
				url: regionUrl(data.srs[r].url)
			})),
			results: Object.keys(data.pps).map(r => {
				result = {
					name: data.pps[r].ppn + ' ' + data.pps[r].ppcc,
					vbs: data.pps[r].vbs,
					// only get senatorial contest id=1
					machines: data.pps[r].vbs.map(m => ({
						name: m.pre,
						url: resultUrl(m.url)
					}))
				};
				return result;
			})
		};
		console.log(obj);
		return obj;
	}).then(region => document.getElementById(region.url).innerHTML = renderRegion(region)); 
};

window.fetchResult = function fetchResult(event, url) {
	event.preventDefault();
	fetch(url).then(response => response.json()
	).then(function (data) {
		// statistics
		let cos = {}
		data.cos.forEach(src => {
			if (typeof cos[src.cc] == 'undefined') cos[src.cc] = {};
			cos[src.cc][src.cn] = src.ct;
		});

		// votes
		let votes = data.rs.filter(rs => rs.cc == 1).map(function (entry) {
			return {
				id: entry.bo,
				name: senatorsLookup[entry.bo].name,
				party: senatorsLookup[entry.bo].party,
				count: entry.v,
				percent: entry.per,
				total: entry.tot
			};
		});

		obj = {
			raw: data,
			// only get the senatorial contest (id=1)
			votes: votes,
			stats: cos[1] 
		};
		console.log(obj);
		return obj;
	}).then(result => document.getElementById(url).innerHTML = renderResult(result));
};

window.renderSenators = function renderSenators() {
	return '<thead><tr><th>ID</th><th>Name</th><th>Party</th></tr></thead>' +
		senatorsList.reduce(function (acc,cur) {
			senator = cur;
			return acc +
				'<tr><td>' + senator.id + '</td>' +
				'<td>' + senator.name + '</td>' +
				'<td>' + senator.party + '</td></tr>';
		}, '')	
}

window.renderRegion = function renderRegion(region) {
	console.log(region);
	let headerLevel;
	switch (region.level) {
		case 'Country': headerLevel = 'h1'; break;
		case 'Region': headerLevel = 'h2'; break;
		case 'Province': headerLevel = 'h3'; break;
		case 'City/Municipality': headerLevel = 'h4'; break;
		case 'Barangay': headerLevel = 'h5'; break;
		default: headerLevel = 'h5';
	}
	return '<' + headerLevel + '>' + region.name + '</' + headerLevel + '>' +
		'<div class="subregions">' + listSubRegions(region.subregions) + '</div>' +
		'<div class="results">' + listResults(region.results) + '</div>'
};

window.renderResult = function renderResult(result) {
	let calcTotal = 0;
	let calcPerc = 0;
	let votesTable = '<table>' +
		'<caption>Votes</caption>' +
		'<thead><tr><th>Name</th> <th>Party</th> <th>Count</th> <th>Percent</th></tr></thead>' +
		result.votes.reduce(function (acc, entry) {
			calcTotal += entry.count;
			calcPerc  += parseFloat(entry.percent);
			return acc +
				'<tr><td>' + entry.name + '</td>' +
					'<td>' + entry.party + '</td>' +
					'<td class="num">' + entry.count + '</td>' +
					'<td class="num">' + entry.percent + '%</td>' +
				'</td></tr>';
		}, '') + 		
		'<tr><td>Total (received)</td><td></td><td>' + result.votes[0].total + '</td><td>100%</td></tr>' +
		'<tr><td>Total (calculated)</td><td></td><td>' + calcTotal + '</td><td>' + Math.round(calcPerc) + '%</td></tr>' +
		'</table>';

	let statisticsTable = '<table>' +
		'<caption>Statistics</caption>' +
		Object.keys(result.stats).reduce(function (acc, field) {
			return acc +
				'<tr><td>' + field + '</td><td class="num">' + result.stats[field] + '</td></tr>';
		}, '') +
		'</table>';

	return votesTable + statisticsTable;
};

window.listResults = function listResults(results) {
	if ((!results) || (results instanceof Array && results.length == 0)) return '';
	return 'Results: <ul>' +
		results.reduce(function (acc, cur) {
				return acc +
				'<li>' + cur.name + '<ul class="machines">' +
					listMachines(cur.machines) +
				'</ul>' + 
				'</li>'
				}, '') +
	'</ul>';
};

window.listMachines = function listMachines(machines) {
	if ((!machines) || (machines instanceof Array && machines.length == 0)) return '';

	return machines.reduce(function (acc, cur) {
		return acc +
			'<li><div id="' + cur.url + '">' +
				'<a href="#" onclick="fetchResult(event, \'' + cur.url + '\')">' +
					cur.name +
				'</a>' +
			'</div></li>';
	}, '');
};

window.listSubRegions = function listSubRegions(regions) {
	if ((!regions) || (regions instanceof Array && regions.length == 0)) return '';
	return "Subregions: <ul>" +
		regions.reduce(function (acc, cur) {
				return acc +
				'<li><div id="' + cur.url + '">' +
					'<a href="#" onclick="fetchRegion(event, \'' + cur.url + '\')">' +
						cur.name +
						listResults(cur.results) +
					'</a>' +
				'</div></li>';
				}, '') +
	'</ul>';
};

regions = Object.keys(root.srs).map(r => ({
	name: root.srs[r].rn,
	level: root.srs[r].can,
	url: regionUrl(root.srs[r].url)
}));

rootRegion = {
	raw: root,
	name: root.rn,
	level: root.can,
	url: regionUrl('root'),
	subregions: regions 
};

document.body.innerHTML = '<style id="styles"></style><table id="senatorTable"></table><div id="root"></div>';
document.getElementById('root').innerHTML = renderRegion(rootRegion);
document.getElementById('styles').innerHTML += 'table td.num { text-align: right; }\n';
