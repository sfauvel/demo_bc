

export const trunkId = (id) => {
	return ".." +((""+id).substr(5))
}

export const orderedJson = (json) => {
	if (Object.keys(json).length===0 || Object.keys(json)[0] === "0") {
		return json;
	}
	const ordered = {};
	Object.keys(json).sort().forEach(function(key) {
		ordered[key] = orderedJson(json[key]);
	});
	return ordered;
}

export const hashCode = (txt) => {		
	const ordered = orderedJson(JSON.parse(txt));
	console.log(ordered);
	let text = JSON.stringify(ordered)

  var hash = 0, i, chr;
  if (text.length === 0) return hash;
  for (i = 0; i < text.length; i++) {
    chr   = text.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}