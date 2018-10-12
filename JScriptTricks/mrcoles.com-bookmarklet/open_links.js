var links = [
	'link',
	'link',	
];
window.location.replace(links[0]);
for(var l=1; l<links.length;l++) {
	if(links[l])window.open(links[l]);
}