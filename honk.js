const honk = {
	toHtml: function(...opts) {
		let markup = opts[0]
		let args = opts[1]
		let lastWord = ''
		let lastLet = ''
		let output
		let curElement = null
		let curElementAttrs = []
		let curAttrs = ''
		let curAttrTxt
		let attrOpen = false
		let attrTxtOpen = false
		for(var i=0;i < markup.length;i++) {
			let cur = markup[i]
			console.log(cur)
			if (cur == ' ' || cur == '\t' || cur == '\n') {
				lastWord = ''
			}
			if (lastWord.length > 0 && lastLet != '\\' && cur == ':' || cur == '(') {
				curElement = lastWord
				lastWord = ''
				
				if (cur == '(') {
					attrOpen = true
				}
				if (cur == ':' && attrOpen == true) {
					curAttrs = lastWord
				}
			}
			if (cur == '"' || cur == "'" || cur == '`' && attrOpen == true){
				if (attrTxtOpen == true) {
					attrTxtOpen = false
				} else {
					attrTxtOpen = true
				}
			}
			if (attrTxtOpen == true) {
				curAttrTxt += cur
			}
			if (cur == ',' || cur == " " && attrOpen == true){
				curElementAttrs.push({name: curAttrs, txt: curAttrTxt})
			}
			lastLet = cur
			if (cur != ' ' || cur != '\t' || cur != '\n' || attrOpen == true) {
				lastWord += cur
			}
		}
		
	}
}