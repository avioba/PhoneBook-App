import { Injectable, EventEmitter } from "@angular/core";
import { Subscriber } from "./subscriber.model";
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SubscriberService {
  formData: Subscriber;
  readonly rootURL = "http://localhost:51621/api";
  list: Subscriber[];
  listO: Observable<Subscriber[]>;
  invokeRerender = new EventEmitter();
  subsVar: Subscription;

  constructor(private http: HttpClient) {}

  rerender() {
    this.invokeRerender.emit();
  }

  //this func calls the WebAPI method GetSubscriber
  //and gets all the Subscribers
  getSubscriber(): Observable<any> {
    return this.http.get(this.rootURL + "/Subscriber");
  }

  //this func calls the WebAPI method PostSubscriber
  //and post new Subscriber
  PostSubscriber() {
    return this.http.post(this.rootURL + "/Subscriber", this.formData);
  }

  //this func calls the WebAPI method PutSubscriber
  //and update specific Subscriber
  PutSubscriber() {
    return this.http.put(
      this.rootURL + "/Subscriber/" + this.formData.id,
      this.formData
    );
  }

  //this func calls the WebAPI method DeleteSubscriber
  //and delete specific Subscriber
  deleteSubscriber(id) {
    return this.http.delete(this.rootURL + "/Subscriber/" + id);
  }

  //this function gets the Suscribers table
  //and show it or refresh it
  refreshList() {
    this.http
      .get(this.rootURL + "/Subscriber")
      .toPromise()
      .then(res => (this.list = res as Subscriber[]));
  }
}
