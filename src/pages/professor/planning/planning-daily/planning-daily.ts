import { Component, ViewChild, AfterViewInit, Renderer } from "@angular/core";
import {
  IonicPage,
  NavController,
  Platform,
  NavParams,
  AlertController
} from "ionic-angular";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import { ElementRef } from "@angular/core";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";

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
export class PlanningDailyPage implements AfterViewInit {
  pdfObj = null;
  planning: any;
  @ViewChild("test")
  el: ElementRef;
  checked = false;

  constructor(
    public navCtrl: NavController,
    private plt: Platform,
    private navParams: NavParams,
    private _renderer: Renderer,
    private file: File,
    private fileOpener: FileOpener,
    private alertCtrl: AlertController
  ) {
    this.planning = this.navParams.get("planning");
    if (localStorage.getItem(this.planning._id)) {
      this.checked = true;
    }
  }

  ngAfterViewInit(): void {
    console.log(this.el);

    this._renderer.setElementProperty(
      this.el.nativeElement,
      "innerHTML",
      this.planning.content
    );
  }

  downloadPlanning() {
    html2canvas(this.el.nativeElement).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      if (this.plt.is("cordova")) {
        var blob = pdf.output("blob", { type: "application/pdf" });

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
      }
      pdf.save("MYPdf.pdf"); // Generated PDF
      console.log(pdf);
    });
  }

  toggleChanged(ev) {
    if (ev.value) {
      localStorage.setItem(this.planning._id, JSON.stringify(this.planning));
      let alertRemoveOffLine = this.alertCtrl.create({});
    } else {
      localStorage.removeItem(this.planning._id);
    }
  }
}
