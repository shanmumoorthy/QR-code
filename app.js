function generateQRCode() {
    var textInput = document.getElementById("textInput").value;
    var qrCode = document.getElementById("qrCode");
    var downloadButton = document.getElementById("downloadButton");
    qrCode.innerHTML = "";
    var isURL = isValidURL(textInput);

    if (!isNaN(textInput)) {
        alert("Please enter a valid text or URL");
        return;
    }

    if (isURL) {
        generateQRCodeForURL(textInput, qrCode);
    } else {
        generateQRCodeForText(textInput, qrCode);
    }
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function generateQRCodeForURL(url, qrCode) {
    var qrUrl ="https://api.qrserver.com/v1/create-qr-code/?size=30x0300&data=" + encodeURIComponent(url);
    var img = new Image();
    img.src = qrUrl;
    qrCode.appendChild(img);
    downloadButton.style.display="inline-block";
}

function generateQRCodeForText(text, qrCode) {
    var qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=20x0200&data=" + encodeURIComponent(text);
    var img = new Image();
    img.src = qrUrl;
    qrCode.appendChild(img);
    downloadButton.style.display="inline-block";
}
function downloadQRCode() {
    var qrCodeImg = document.querySelector("#qrCode img");
    
    if (qrCodeImg) {
        var link = document.createElement("a");
        link.href = qrCodeImg.src;
        link.download = "qr_code.png"; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("No QR code generated yet");
    }
}