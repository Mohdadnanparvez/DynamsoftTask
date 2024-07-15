var DWObject;

function Dynamsoft_OnReady() {
  DWObject = Dynamsoft.DWT.GetWebTwain("dwtcontrolContainer");
  populateSourceList();
}

function initializeDWT() {
  if (
    typeof Dynamsoft !== "undefined" &&
    typeof Dynamsoft.DWT !== "undefined"
  ) {
    Dynamsoft.DWT.AutoLoad = true;
    Dynamsoft.DWT.RegisterEvent("OnWebTwainReady", Dynamsoft_OnReady);
  } else {
    console.error("Dynamic Web TWAIN SDK not loaded correctly.");
  }
}

function populateSourceList() {
  if (DWObject) {
    var sourceSelect = document.getElementById("sourceSelect");
    var sourceNames = DWObject.GetSourceNames();

    sourceNames.forEach(function (name, index) {
      var option = document.createElement("option");
      option.value = index;
      option.text = name;
      sourceSelect.add(option);
    });
  }
}

function scanAndSavePDF() {
  if (DWObject) {
    var selectedIndex = document.getElementById("sourceSelect").selectedIndex;
    if (selectedIndex >= 0) {
      DWObject.SelectSourceByIndex(selectedIndex);
      DWObject.PixelType = parseInt(
        document.querySelector('input[name="pixelType"]:checked').value
      );
      DWObject.Resolution = parseInt(
        document.getElementById("resolution").value
      );

      // Show UI
      DWObject.ShowUI = document.getElementById("showUI").checked;
      // AutoFeeder
      DWObject.AutoFeed = document.getElementById("autoFeeder").checked;

      DWObject.AcquireImageAsync({ IfCloseSourceAfterAcquire: true })
        .then(function () {
          DWObject.SaveAllAsPDF(" D:\\temp\\result.pdf");
          // alert("Images saved as multi-page PDF.");
        })
        .catch(function (exp) {
          alert(exp.message);
        });
    } else {
      alert("Please select a scanner source first.");
    }
  }
}

// function scanAndSaveIndividualPDFs() {
//     if (DWObject) {
//         var selectedIndex = document.getElementById('sourceSelect').selectedIndex;
//         if (selectedIndex >= 0) {
//             DWObject.SelectSourceByIndex(selectedIndex);
//             DWObject.PixelType = parseInt(document.querySelector('input[name="pixelType"]:checked').value);
//             DWObject.Resolution = parseInt(document.getElementById('resolution').value);

//             // Show UI
//             DWObject.ShowUI = document.getElementById('showUI').checked;
//             // AutoFeeder
//             DWObject.AutoFeed = document.getElementById('autoFeeder').checked;

//             DWObject.AcquireImageAsync({ IfCloseSourceAfterAcquire: true }).then(function () {
//                 for (let i = 0; i < DWObject.HowManyImagesInBuffer; i++) {
//                    DWObject.SaveAsPDF(`D:\\temp\\image_${i}.pdf`,i)
//                   // alert("Images saved as individual  PDF.");
//                 }

//             }).catch(function (exp) {
//                 alert(exp.message);
//             });
//         } else {
//             alert("Please select a scanner source first.");
//         }
//     }
// }

function scanAndSaveIndividualPDFs() {
  if (DWObject) {
    var selectedIndex = document.getElementById("sourceSelect").selectedIndex;
    if (selectedIndex >= 0) {
      DWObject.SelectSourceByIndex(selectedIndex);
      DWObject.PixelType = parseInt(
        document.querySelector('input[name="pixelType"]:checked').value
      );
      DWObject.Resolution = parseInt(
        document.getElementById("resolution").value
      );

      DWObject.AcquireImageAsync({ IfCloseSourceAfterAcquire: true })
        .then(function () {
          for (var i = 0; i < DWObject.HowManyImagesInBuffer; i++) {
            DWObject.SaveAsPDF("D:\\temp\\Image_" + (i + 1) + ".pdf", i);
          }
        })
        .catch(function (exp) {
          alert(exp.message);
        });
    } else {
      alert("Please select a scanner source first.");
    }
  }
}

function removeAllImages() {
  if (DWObject) {
    var imageCount = DWObject.HowManyImagesInBuffer;
    for (var i = imageCount - 1; i >= 0; i--) {
      DWObject.RemoveImage(i); // Assuming RemoveImage is a valid method
    }
  }
}
