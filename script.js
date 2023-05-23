// Mendapatkan elemen-elemen dari DOM
let qrVideo = document.getElementById("qrVideo");
let qrCanvas = document.getElementById("qrCanvas");
let resultDiv = document.getElementById("result");

// Minta izin untuk mengakses kamera
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    qrVideo.srcObject = stream;
    qrVideo.play();
    requestAnimationFrame(tick);
  })
  .catch(function (error) {
    console.error("Error accessing camera: ", error);
  });

function tick() {
  if (qrVideo.readyState === qrVideo.HAVE_ENOUGH_DATA) {
    qrCanvas
      .getContext("2d")
      .drawImage(qrVideo, 0, 0, qrCanvas.width, qrCanvas.height);
    let imageData = qrCanvas
      .getContext("2d")
      .getImageData(0, 0, qrCanvas.width, qrCanvas.height);
    // Memanggil fungsi jsQR untuk membaca QR code
    let code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      resultDiv.innerText = code.data;
    } else {
      resultDiv.innerText = "QR code tidak terdeteksi";
    }
  }

  requestAnimationFrame(tick);
}
