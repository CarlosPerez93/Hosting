import { message } from 'antd';

export const chosenVideo = (e, setDuration, setFile, planSelected) => {
  e.preventDefault();
  var file = e.target.files[0];
  var mime = file?.type;

  if (planSelected !== null) {
    if (mime === "video/mp4" || mime === "video/ogv" || mime === "video/webm") {
      let rd = new FileReader()
      rd.onload = function (e) {
        var blob = new Blob([e.target.result], {
          type: mime
        })
        let url = (URL || window.webkitURL).createObjectURL(blob)
        let video = document.createElement("video");
        video.preload = "metadata";
        video.addEventListener("loadedmetadata", function () {
          setDuration(video.duration)
        });
        video.src = url;
      };
      setFile(file)
      var chunk = file?.slice(0, 500000);
      rd.readAsArrayBuffer(chunk);
    } else {
      message.error('Solo se permite subir videos')
    }
  } else {
    message.error('Por favor seleccione un plan')
  }
}
