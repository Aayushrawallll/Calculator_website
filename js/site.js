$(function () {
	var displayVal = $("#calcDisplay").text();
	if (isEmpty(displayVal)) {
		$("#calcDisplay").text("0")
	}
	$(".dg-calc-btn").on("click", function () {
		var btnType = $(this).data("btn-type");
		var btnId = $(this).data("btn-id");
		var resetDisplay = $("#calcResetDisplayOnNextNumber").val();
		if (!isEmpty(btnType) && !isEmpty(btnId) && btnType == "num") {
			var calcDisplay = $("#calcDisplay").text();
			if (isEmpty(calcDisplay) || calcDisplay == "0") {
				$("#calcDisplay").text(btnId);
			}
			else if (!isEmpty(resetDisplay) && resetDisplay == "true") {
				$("#calcResetDisplayOnNextNumber").val("");
				$("#calcDisplay").text(btnId);
			}
			else {
				var newDisplay = calcDisplay + btnId;
				$("#calcDisplay").text(newDisplay);
			}
		}
		else if (!isEmpty(btnType) && !isEmpty(btnId) && btnType == "func") {
			var calcDisplay = $("#calcDisplay").text();
			var calcRegister = $("#calcRegister").val();
			var calcFunction = $("#calcSelectedFunction").val();
			if (btnId == "C") {
				$("#calcDisplay").text("0");
				$("#calcRegister").val("");
				$("#calcSelectedFunction").val("");
			}
			if (btnId == "CE") {
				$("#calcDisplay").text("0");
			}
			if (btnId == "E" && (isEmpty(resetDisplay) || resetDisplay != "true")) {
				if (!isEmpty(calcRegister) && !isEmpty(calcFunction)) {
					var result = doMath(calcRegister, calcDisplay, calcFunction);
					$("#calcRegister").val("");
					$("#calcSelectedFunction").val("");
					$("#calcResetDisplayOnNextNumber").val("");
					$("#calcDisplay").text(result);
				}
				else {
					$("#calcRegister").val("");
					$("#calcSelectedFunction").val("");
					$("#calcResetDisplayOnNextNumber").val("");
					$("#calcDisplay").text(calcDisplay);
				}
			}
			if (btnId == "P" && (isEmpty(resetDisplay) || resetDisplay != "true")) {
				if (!isEmpty(calcRegister) && !isEmpty(calcFunction)) {
					var result = doMath(calcRegister, calcDisplay, calcFunction);
					$("#calcRegister").val(result);
					$("#calcSelectedFunction").val(btnId);
					$("#calcDisplay").text(result + " +");
					$("#calcResetDisplayOnNextNumber").val("true");
				}
				else {
					$("#calcRegister").val(calcDisplay);
					$("#calcSelectedFunction").val(btnId);
					$("#calcDisplay").text(calcDisplay + " +");
					$("#calcResetDisplayOnNextNumber").val("true");
				}
			}
			if (btnId == "M" && (isEmpty(resetDisplay) || resetDisplay != "true")) {
				if (!isEmpty(calcRegister) && !isEmpty(calcFunction)) {
					var result = doMath(calcRegister, calcDisplay, calcFunction);
					$("#calcRegister").val(result);
					$("#calcSelectedFunction").val(btnId);
					$("#calcDisplay").text(result + " -");
					$("#calcResetDisplayOnNextNumber").val("true");
				}
				else {
					$("#calcRegister").val(calcDisplay);
					$("#calcSelectedFunction").val(btnId);
					$("#calcDisplay").text(calcDisplay + " -");
					$("#calcResetDisplayOnNextNumber").val("true");
				}
			}
			if (btnId == "T" && (isEmpty(resetDisplay) || resetDisplay != "true")) {
				if (!isEmpty(calcRegister) && !isEmpty(calcFunction)) {
					var result = doMath(calcRegister, calcDisplay, calcFunction);
					$("#calcRegister").val(result);
					$("#calcSelectedFunction").val(btnId);
					$("#calcDisplay").text(result + " \xD7");
					$("#calcResetDisplayOnNextNumber").val("true");
				}
				else {
					$("#calcRegister").val(calcDisplay);
					$("#calcSelectedFunction").val(btnId);
					$("#calcDisplay").text(calcDisplay + " \xD7");
					$("#calcResetDisplayOnNextNumber").val("true");
				}
			}
			if (btnId == "D" && (isEmpty(resetDisplay) || resetDisplay != "true")) {
				if (!isEmpty(calcRegister) && !isEmpty(calcFunction)) {
					var result = doMath(calcRegister, calcDisplay, calcFunction);
					$("#calcRegister").val(result);
					$("#calcSelectedFunction").val(btnId);
					$("#calcDisplay").text(result + " \xF7");
					$("#calcResetDisplayOnNextNumber").val("true");
				}
				else {
					$("#calcRegister").val(calcDisplay);
					$("#calcSelectedFunction").val(btnId);
					$("#calcDisplay").text(calcDisplay + " \xF7");
					$("#calcResetDisplayOnNextNumber").val("true");
				}
			}
			if (btnId == "DP" && calcDisplay.indexOf(".", 0) == -1) {
				if (!isEmpty(resetDisplay) && resetDisplay == "true") {
					$("#calcResetDisplayOnNextNumber").val("");
					calcDisplay = "0";
				}
				var newDisplay = calcDisplay + ".";
				$("#calcDisplay").text(newDisplay.toString());
			}
			if (btnId == "PM" && (isEmpty(resetDisplay) || resetDisplay != "true")) {
				var newDisplay = parseFloat(calcDisplay) * (-1);
				$("#calcDisplay").text(newDisplay.toString());
			}
		}
	});
});

function isEmpty(v) {
	return typeof v == 'string' && !v.trim() || typeof v == 'undefined' || v === null;
}

function doMath(num1, num2, func) {
	if (isEmpty(num1)) { num1 = "0"; }
	if (isEmpty(num2)) { num2 = "0"; }
	var result = "";
	if (isEmpty(func)) {
		result = "";
	}
	else if (func == "P") {
		var sum = parseFloat(num1) + parseFloat(num2);
		result = sum.toString();
	}
	else if (func == "M") {
		var difference = parseFloat(num1) - parseFloat(num2);
		result = difference.toString();
	}
	else if (func == "T") {
		var product = parseFloat(num1) * parseFloat(num2);
		result = product.toString();
	}
	else if (func == "D" && parseFloat(num2) != 0) {
		var quotient = parseFloat(num1) / parseFloat(num2);
		result = quotient.toString();
	}
	else if (func == "D" && parseFloat(num2) == 0) {
		result = "ERR DIV BY ZERO";
	}
	return result;
}