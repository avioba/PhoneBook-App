import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { SubscriberService } from "src/app/shared/subscriber.service";
import { Subscriber } from "src/app/shared/subscriber.model";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";

@Component({
  selector: "app-subscriber-list",
  templateUrl: "./subscriber-list.component.html",
  styleUrls: ["./subscriber-list.component.css"]
})
export class SubscriberListComponent implements OnInit {
  constructor(
    private service: SubscriberService,
    private chRef: ChangeDetectorRef
  ) {}

  //DataTables Properties
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  language = {
    processing: "מעבד...",
    lengthMenu: "הצג _MENU_ פריטים",
    zeroRecords: "לא נמצאו רשומות מתאימות",
    emptyTable: "לא נמצאו רשומות מתאימות",
    info: "_START_ עד _END_ מתוך _TOTAL_ רשומות",
    infoEmpty: "0 עד 0 מתוך 0 רשומות",
    infoFiltered: "(מסונן מסך _MAX_  רשומות)",
    infoPostFix: "",
    search: "חפש:",
    url: "",
    paginate: {
      first: "ראשון",
      previous: "קודם",
      next: "הבא",
      last: "אחרון"
    }
  };

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  ngOnInit() {
    this.service.refreshList();
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      autoWidth: true,
      order: [[0, "asc"]],
      language: this.language
    };
    this.service.listO = this.service.getSubscriber();
    this.service.listO.subscribe(res => {
      this.service.list = res;
      this.chRef.detectChanges();
      this.dtTrigger.next();
    });

    if (this.service.subsVar == undefined) {
      this.service.subsVar = this.service.invokeRerender.subscribe(() => {
        this.rerender();
      });
    }
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  //this func brings the data from a clicked row
  //and preparing the form with that data for editing
  populateForm(sub: Subscriber) {
    this.service.formData = Object.assign({}, sub);
  }

  //this func delete specific Subscriber (after confirm)
  //and refresh the table
  onDelete(id) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.deleteSubscriber(id).subscribe(
        res => {
          this.rerender();
          this.service.refreshList();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
