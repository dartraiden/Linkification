// ==UserScript==
// @name            Linkification
// @description     Turn plain text URLs into clickable links
// @namespace       http://userscripts.org/users/splurov/
// @version         20160216.1
// @include         *
// @exclude         http://www.google.tld/search*
// @exclude         https://www.google.tld/search*
// @exclude         http://music.google.com/*
// @exclude         https://music.google.com/*
// @exclude         http://mail.google.com/*
// @exclude         https://mail.google.com/*
// @exclude         http://docs.google.com/*
// @exclude         https://docs.google.com/*
// @exclude         http://mxr.mozilla.org/*
// @exclude         http://yandex.com/search*
// @exclude         https://yandex.com/search*
// @exclude         http://yandex.ru/search*
// @exclude         https://yandex.ru/search*
// @updateURL	    https://github.com/dartraiden/Linkification/raw/master/linkification.meta.js
// @downloadURL     https://github.com/dartraiden/Linkification/raw/master/linkification.user.js
// @supportURL	    https://github.com/dartraiden/Linkification/issues
// ==/UserScript==

(function(){

// https://bit.namecoin.info
// http://emercoin.com/EMCDNS_and_NVS
// http://data.iana.org/TLD/tlds-alpha-by-domain.txt
var domains = ['bit', 'emc', 'coin', 'lib', 'bazar', 'abb', 'abbott', 'abogado', 'ac', 'academy', 'accenture', 'accountant', 'accountants', 'active', 'actor', 'ad', 'ads', 'adult', 'ae', 'aero', 'af', 'afl', 'ag', 'agency', 'ai', 'aig', 'airforce', 'al', 'allfinanz', 'alsace', 'am', 'amsterdam', 'an', 'android', 'ao', 'apartments', 'aq', 'aquarelle', 'ar', 'archi', 'army', 'arpa', 'as', 'asia', 'associates', 'at', 'attorney', 'au', 'auction', 'audio', 'auto', 'autos', 'aw', 'ax', 'axa', 'az', 'ba', 'band', 'bank', 'bar', 'barclaycard', 'barclays', 'bargains', 'bauhaus', 'bayern', 'bb', 'bbc', 'bd', 'be', 'beer', 'berlin', 'best', 'bf', 'bg', 'bh', 'bi', 'bid', 'bike', 'bingo', 'bio', 'biz', 'bj', 'black', 'blackfriday', 'bloomberg', 'blue', 'bm', 'bmw', 'bn', 'bnpparibas', 'bo', 'boats', 'bond', 'boo', 'boutique', 'br', 'bridgestone', 'broker', 'brussels', 'bs', 'bt', 'budapest', 'build', 'builders', 'business', 'buzz', 'bv', 'bw', 'by', 'bz', 'bzh', 'ca', 'cab', 'cafe', 'cal', 'camera', 'camp', 'cancerresearch', 'canon', 'capetown', 'capital', 'caravan', 'cards', 'care', 'career', 'careers', 'cars', 'cartier', 'casa', 'cash', 'casino', 'cat', 'catering', 'cbn', 'cc', 'cd', 'center', 'ceo', 'cern', 'cf', 'cfa', 'cfd', 'cg', 'ch', 'channel', 'chat', 'cheap', 'chloe', 'christmas', 'chrome', 'church', 'ci', 'citic', 'city', 'ck', 'cl', 'claims', 'cleaning', 'click', 'clinic', 'clothing', 'club', 'cm', 'cn', 'co', 'coach', 'codes', 'coffee', 'college', 'cologne', 'com', 'community', 'company', 'computer', 'condos', 'construction', 'consulting', 'contractors', 'cooking', 'cool', 'coop', 'country', 'courses', 'cr', 'credit', 'creditcard', 'cricket', 'crs', 'cruises', 'cu', 'cuisinella', 'cv', 'cw', 'cx', 'cy', 'cymru', 'cyou', 'cz', 'dabur', 'dad', 'dance', 'date', 'dating', 'datsun', 'day', 'dclk', 'de', 'deals', 'degree', 'delivery', 'democrat', 'dental', 'dentist', 'desi', 'design', 'dev', 'diamonds', 'diet', 'digital', 'direct', 'directory', 'discount', 'dj', 'dk', 'dm', 'dnp', 'do', 'docs', 'dog', 'doha', 'domains', 'doosan', 'download', 'durban', 'dvag', 'dz', 'eat', 'ec', 'edu', 'education', 'ee', 'eg', 'email', 'emerck', 'energy', 'engineer', 'engineering', 'enterprises', 'epson', 'equipment', 'er', 'erni', 'es', 'esq', 'estate', 'et', 'eu', 'eurovision', 'eus', 'events', 'everbank', 'exchange', 'expert', 'exposed', 'express', 'fail', 'faith', 'fan', 'fans', 'farm', 'fashion', 'feedback', 'fi', 'film', 'finance', 'financial', 'firmdale', 'fish', 'fishing', 'fit', 'fitness', 'fj', 'fk', 'flights', 'florist', 'flowers', 'flsmidth', 'fly', 'fm', 'fo', 'foo', 'football', 'forex', 'forsale', 'foundation', 'fr', 'frl', 'frogans', 'fund', 'furniture', 'futbol', 'ga', 'gal', 'gallery', 'garden', 'gb', 'gbiz', 'gd', 'gdn', 'ge', 'gent', 'gf', 'gg', 'ggee', 'gh', 'gi', 'gift', 'gifts', 'gives', 'gl', 'glass', 'gle', 'global', 'globo', 'gm', 'gmail', 'gmo', 'gmx', 'gn', 'gold', 'goldpoint', 'golf', 'goo', 'goog', 'google', 'gop', 'gov', 'gp', 'gq', 'gr', 'graphics', 'gratis', 'green', 'gripe', 'gs', 'gt', 'gu', 'guge', 'guide', 'guitars', 'guru', 'gw', 'gy', 'hamburg', 'hangout', 'haus', 'healthcare', 'help', 'here', 'hermes', 'hiphop', 'hitachi', 'hiv', 'hk', 'hm', 'hn', 'hockey', 'holdings', 'holiday', 'homes', 'honda', 'horse', 'host', 'hosting', 'house', 'how', 'hr', 'ht', 'hu', 'ibm', 'icu', 'id', 'ie', 'ifm', 'il', 'im', 'immo', 'immobilien', 'in', 'industries', 'infiniti', 'info', 'ing', 'ink', 'institute', 'insure', 'int', 'international', 'investments', 'io', 'iq', 'ir', 'irish', 'is', 'it', 'iwc', 'java', 'jcb', 'je', 'jetzt', 'jewelry', 'jm', 'jo', 'jobs', 'joburg', 'jp', 'juegos', 'kaufen', 'kddi', 'ke', 'kg', 'kh', 'ki', 'kim', 'kitchen', 'kiwi', 'km', 'kn', 'koeln', 'komatsu', 'kp', 'kr', 'krd', 'kred', 'kw', 'ky', 'kyoto', 'kz', 'la', 'lacaixa', 'land', 'lat', 'latrobe', 'lawyer', 'lb', 'lc', 'lds', 'lease', 'leclerc', 'legal', 'lgbt', 'li', 'liaison', 'lidl', 'life', 'lighting', 'limited', 'limo', 'link', 'lk', 'loan', 'loans', 'lol', 'london', 'lotte', 'lotto', 'love', 'lr', 'ls', 'lt', 'ltda', 'lu', 'luxe', 'luxury', 'lv', 'ly', 'ma', 'madrid', 'maif', 'maison', 'management', 'mango', 'market', 'marketing', 'markets', 'marriott', 'mc', 'md', 'me', 'media', 'meet', 'melbourne', 'meme', 'memorial', 'menu', 'mg', 'mh', 'miami', 'mil', 'mini', 'mk', 'ml', 'mm', 'mma', 'mn', 'mo', 'mobi', 'moda', 'moe', 'monash', 'money', 'mormon', 'mortgage', 'moscow', 'motorcycles', 'mov', 'movie', 'mp', 'mq', 'mr', 'ms', 'mt', 'mtn', 'mtpc', 'mu', 'museum', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nadex', 'nagoya', 'name', 'navy', 'nc', 'ne', 'nec', 'net', 'network', 'neustar', 'new', 'news', 'nexus', 'nf', 'ng', 'ngo', 'nhk', 'ni', 'nico', 'ninja', 'nissan', 'nl', 'no', 'np', 'nr', 'nra', 'nrw', 'ntt', 'nu', 'nyc', 'nz', 'okinawa', 'om', 'one', 'ong', 'onl', 'online', 'ooo', 'oracle', 'org', 'organic', 'osaka', 'otsuka', 'ovh', 'pa', 'page', 'panerai', 'paris', 'partners', 'parts', 'party', 'pe', 'pf', 'pg', 'ph', 'pharmacy', 'philips', 'photo', 'photography', 'photos', 'physio', 'piaget', 'pics', 'pictet', 'pictures', 'pink', 'pizza', 'pk', 'pl', 'place', 'plumbing', 'plus', 'pm', 'pn', 'pohl', 'poker', 'porn', 'post', 'pr', 'praxi', 'press', 'pro', 'prod', 'productions', 'prof', 'properties', 'property', 'ps', 'pt', 'pub', 'pw', 'py', 'qa', 'qpon', 'quebec', 'racing', 're', 'realtor', 'recipes', 'red', 'redstone', 'rehab', 'reise', 'reisen', 'reit', 'ren', 'rent', 'rentals', 'repair', 'report', 'republican', 'rest', 'restaurant', 'review', 'reviews', 'rich', 'rio', 'rip', 'ro', 'rocks', 'rodeo', 'rs', 'rsvp', 'ru', 'ruhr', 'run', 'rw', 'ryukyu', 'sa', 'saarland', 'sale', 'samsung', 'sap', 'sarl', 'saxo', 'sb', 'sc', 'sca', 'scb', 'schmidt', 'scholarships', 'school', 'schule', 'schwarz', 'science', 'scot', 'sd', 'se', 'seat', 'sener', 'services', 'sew', 'sex', 'sexy', 'sg', 'sh', 'shiksha', 'shoes', 'show', 'shriram', 'si', 'singles', 'site', 'sj', 'sk', 'sky', 'sl', 'sm', 'sn', 'so', 'social', 'software', 'sohu', 'solar', 'solutions', 'sony', 'soy', 'space', 'spiegel', 'spreadbetting', 'sr', 'st', 'study', 'style', 'su', 'sucks', 'supplies', 'supply', 'support', 'surf', 'surgery', 'suzuki', 'sv', 'swiss', 'sx', 'sy', 'sydney', 'systems', 'sz', 'taipei', 'tatar', 'tattoo', 'tax', 'taxi', 'tc', 'td', 'team', 'tech', 'technology', 'tel', 'temasek', 'tennis', 'tf', 'tg', 'th', 'theater', 'tickets', 'tienda', 'tips', 'tires', 'tirol', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'today', 'tokyo', 'tools', 'top', 'toray', 'toshiba', 'tours', 'town', 'toys', 'tr', 'trade', 'trading', 'training', 'travel', 'trust', 'tt', 'tui', 'tv', 'tw', 'tz', 'ua', 'ug', 'uk', 'university', 'uno', 'uol', 'us', 'uy', 'uz', 'va', 'vacations', 'vc', 've', 'vegas', 'ventures', 'versicherung', 'vet', 'vg', 'vi', 'viajes', 'video', 'villas', 'vision', 'vlaanderen', 'vn', 'vodka', 'vote', 'voting', 'voto', 'voyage', 'vu', 'wales', 'wang', 'watch', 'webcam', 'website', 'wed', 'wedding', 'weir', 'wf', 'whoswho', 'wien', 'wiki', 'williamhill', 'win', 'wme', 'work', 'works', 'world', 'ws', 'wtc', 'wtf', 'xerox', 'xin', 'xxx', 'xyz', 'yachts', 'yandex', 'ye', 'yodobashi', 'yoga', 'yokohama', 'youtube', 'yt', 'za', 'zip', 'zm', 'zone', 'zuerich', 'zw'];

// http://yellow5.us/firefox/linkification/
var tagsForSkip = ['a', 'applet', 'area', 'embed', 'frame', 'frameset', 'head', 'iframe', 'img', 'map', 'meta', 'noscript', 'object', 'option', 'param', 'script', 'select', 'style', 'textarea', 'title'];

var inArray = function(value, items) {
	for (var i = 0; items[i] && value != items[i]; i++);
	return value == items[i];
}

var urlsRegExp = /(^|[\s()\[\]_:~+@*"'>])((?:https?|ftp|irc):\/\/)?([-a-z\d;:&=+$,%_.!~*'()]+@)?((?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:(www|irc|ftp)\.)?(?:(?:[a-z\d]|[a-z\d][a-z\d-]*[a-z\d])\.)+([a-z]{2,6}))(:\d+)?(\/(?:[-\w.!~*'()%:@&=+$,;\/]*[\w~*%@&=+$\/])?(?:\?(?:[-\w;\/?:@&=+$,.!~*'()%\[\]|]*[\w\/@&=+$~*%])?)?(?:#(?:[-\w;\/?:@&=+$,.!~*'()%]*[\w\/@&=+$~*%])?)?|\b)/i

var linksCounter = 0;

var current = document.body;
while (current) {
	if (current.nodeName == '#text' && (match = current.nodeValue.match(urlsRegExp)) && inArray(match[6], domains)) {
		var url;
		if (match[3] && ! match[2] && ! match[5] && ! match[8] && (match[3].indexOf(':') == -1 || match[3].indexOf('mailto:') == 0)) {
			url = (match[3].indexOf('mailto:') == -1 ? 'mailto:' : '')
					+ match[3]
					+ match[4];
		}
		else {
			url = (match[2] ? match[2] : (! match[5] || match[5] == 'www' ? 'http' : match[5]) + '://')
					+ (match[3] ? match[3] : '')
					+ match[4]
					+ (match[7] ? match[7] : '')
					+ (match[8] ? match[8] : '');
		}
		if (url) {
			var range = document.createRange();
			range.setStart(current, match.index + match[1].length);
			range.setEnd(current, match.index + match[0].length);
			var a = document.createElement('a');
			a.setAttribute('href', url);
			a.setAttribute('class', 'linkified');
			a.appendChild(range.extractContents());
			range.insertNode(a);
			range.detach();
			linksCounter++;
		}
	}
	if (current.tagName && !inArray(current.tagName.toLowerCase(), tagsForSkip) && current.firstChild) {
		current = current.firstChild;
	}
	else if (current.nextSibling) {
		current = current.nextSibling;
	}
	else {
		do {
			current = current.parentNode;
		} while (!current.nextSibling && current.parentNode);
		current = current.nextSibling;
	}
}

})();
