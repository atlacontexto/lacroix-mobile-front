import { Component } from "@angular/core";
import { IonicPage, NavController, Platform } from "ionic-angular";
import { FileOpener } from "@ionic-native/file-opener";
import { File } from "@ionic-native/file";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Generated class for the PlanningDailyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-planning-daily",
  templateUrl: "planning-daily.html"
})
export class PlanningDailyPage {
  letterObj = {
    to: "Barbara",
    from: "Savio",
    text: "Olha o mini-couper na frente da garagem!"
  };

  pdfObj = null;

  constructor(
    public navCtrl: NavController,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) {}

  createPdf() {
    var docDefinition = {
      content: [
        { text: "REMINDER", style: "header" },
        { text: new Date().toTimeString(), alignment: "right" },

        { text: "From", style: "subheader" },
        { text: this.letterObj.from },

        { text: "To", style: "subheader" },
        this.letterObj.to,

        { text: this.letterObj.text, style: "story", margin: [0, 20, 0, 20] },

        {
          ul: ["Bacon", "Rips", "BBQ"]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: "center",
          width: "50%"
        }
      }
    };
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    if (this.plt.is("cordova")) {
      this.pdfObj.getBuffer(buffer => {
        var blob = new Blob([buffer], { type: "application/pdf" });

        // Save the PDF to the data Directory of our App
        this.file
          .writeFile(this.file.dataDirectory, "myletter.pdf", blob, {
            replace: true
          })
          .then(fileEntry => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(
              this.file.dataDirectory + "myletter.pdf",
              "application/pdf"
            );
          });
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
}
