import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { SubscribersComponent } from "./subscribers/subscribers.component";
import { SubscriberComponent } from "./subscribers/subscriber/subscriber.component";
import { SubscriberListComponent } from "./subscribers/subscriber-list/subscriber-list.component";
import { SubscriberService } from "./shared/subscriber.service";
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [
    AppComponent,
    SubscribersComponent,
    SubscriberComponent,
    SubscriberListComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, DataTablesModule],
  providers: [SubscriberService],
  bootstrap: [AppComponent]
})
export class AppModule {}
