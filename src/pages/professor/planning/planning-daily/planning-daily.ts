import { Component, ViewChild, AfterViewInit, Renderer } from "@angular/core";
import { IonicPage, NavController, Platform, NavParams } from "ionic-angular";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import { ElementRef } from "@angular/core";

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

  constructor(
    public navCtrl: NavController,
    private plt: Platform,
    private navParams: NavParams,
    private _renderer: Renderer
  ) {
    this.planning = this.navParams.get("planning");
  }

  ngAfterViewInit(): void {
    console.log(this.el);

    this._renderer.setElementProperty(
      this.el.nativeElement,
      "innerHTML",
      this.planning.content
    );
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
      pdf.save("MYPdf.pdf"); // Generated PDF
      console.log(pdf);
    });
  }
}
