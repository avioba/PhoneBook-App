import { SubscriberService } from "../../shared/subscriber.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-subscriber",
  templateUrl: "./subscriber.component.html",
  styleUrls: ["./subscriber.component.css"]
})
export class SubscriberComponent implements OnInit {
  constructor(private service: SubscriberService) {}

  ngOnInit() {
    this.resetForm();
  }

  rerender() {
    this.service.rerender();
  }

  //reset the form
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      id: 0,
      family: "",
      phone1: "",
      phone2: "",
      phone3: "",
      pobox: ""
    };
  }

  //submit the form
  //check first if formData.id = 0
  //if its true that means the record is new
  //and the function insertRecord runs
  //else the function updateRecord runs
  onSubmit(form: NgForm) {
    if (this.service.formData.id == 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  //this func post new Subscriber
  //reset the form
  //and refresh the table
  insertRecord(form: NgForm) {
    this.service.PostSubscriber().subscribe(
      res => {
        this.resetForm(form);
        this.rerender();
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }

  //this func update specific Subscriber
  //reset the form
  //and refresh the table
  updateRecord(form: NgForm) {
    this.service.PutSubscriber().subscribe(
      res => {
        this.resetForm(form);
        this.rerender();
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
}
