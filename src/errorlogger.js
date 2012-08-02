/*global alert:false, window:false */
(function () {

	var isDefinedAsAMD = false;


	function handleScriptError(errorMsg, url, lineNumber) {

		var message = "Javascript error: " + errorMsg + "\r\nsource: " + url + "\r\nline: " +  lineNumber;

		if ( url === "" && lineNumber === 0){
			message = message + "\r\n\r\nTip: The real message, the Url and Line number are not available on Chrome if scripts are loaded using file://. Check the developper tool console for the exception details.";
		}
		alert(message);
	}

	function handleAMDError(err) {
		alert("AMDJS error: Cannot load module '" + err.requireModules + "'");			
	}

	function hookWindowError () {
		window.onerror = handleScriptError;
	}

	function hookAMD(noConflict) {

		/* try to define AMD module, if it fails it is because no AMD library is loaded yet */
		if ( !isDefinedAsAMD ){
			return false;
		}

		if ( window.require.onError === handleAMDError){
			return true;
		}

		window.require.onError = handleAMDError;

		if (noConflict) {
			window.remove("errorlogger");
		}

		return true;
	}


	function init () {
		hookWindowError();
		hookAMD();
		return {
			hookAMD: hookAMD
		};
	}


	/* ===========================================
	Export stuff to window object or AMD. 
	=========================================== */

	function defineAMDModule (fn){

		if ( window.define === undefined ){
			return false;
		}

		if ( isDefinedAsAMD ){
			return true;
		}

		window.define([], fn);
		isDefinedAsAMD = true;
		return true;
	}

	function exportAsGlobal(fn){
		window.errorlogger = fn();
	}

	var sucessfullyDefined = defineAMDModule(init);
	if ( !sucessfullyDefined ){
		exportAsGlobal(init);
	}

})();