import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  companies: any = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get("../../assets/data.json").subscribe(data => {
      console.log(data);
      this.companies = data;
    })
  }

  closeResult: string;
  id: string;
  index: number;
  openModal(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = String(idAttr.nodeValue);
    this.index = Number(value.substr(-1));
    this.id = "myModal" + value.substr(-1);
    document.getElementById(this.id).style.display = "block";
    var titleId = "modal-title" + this.index;
    var bodyId = "modal-body" + this.index;
    var footerId = "modal-footer" + this.index;
    var head = document.getElementById(titleId);
    head.children[1].children[0].children[0].innerHTML = this.companies[this.index].company_name;
    head.children[1].children[0].children[1].innerHTML = this.companies[this.index].title_;
    head.children[1].children[0].children[2].innerHTML = this.companies[this.index].website_;
    var body = document.getElementById(bodyId);
    body.children[0].children[1].innerHTML = this.companies[this.index].Long_description;
    body.children[1].children[1].innerHTML = this.companies[this.index].specialties;
    body.children[2].children[1].innerHTML = this.companies[this.index].Geo_coverage;
    body.children[3].children[1].innerHTML = this.companies[this.index].Analysis;
    var img = document.createElement('img');
    img.src = this.companies[this.index].screenshot;
    img.setAttribute("width", "100%");
    img.setAttribute("alt", "The Pulpit Rock");
    body.children[4].appendChild(img);
    var footer = document.getElementById(footerId);
    footer.children[0].innerHTML = this.companies[this.index].companyAddress;
  }

  closeModal() {
    document.getElementById(this.id).style.display = "none";
  }
}