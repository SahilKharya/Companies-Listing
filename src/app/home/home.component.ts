import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiService } from '../api.service';
import { RequestCode } from '../model/request-code';
import { Add } from '../model/add';
import { Authorize } from '../model/authorize';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  companies: any = [];
  redirect_uri: string;
  consumer_key: string;
  request: RequestCode = {
    consumer_key: undefined,
    redirect_uri: undefined
  };
  authorize: Authorize = {
    consumer_key: undefined,
    code: undefined
  };
  add: Add = {
    url: undefined,
    title: undefined,
    consumer_key: undefined,
    access_token: undefined
  };
  code: string;
  resp: any;

  constructor(private httpClient: HttpClient, private api: ApiService) { }

  ngOnInit() {
    this.httpClient.get("../../assets/data.json").subscribe(data => {
      console.log(data);
      this.companies = data;
    })
    this.redirect_uri = "https://company-listing.netlify.app";
    this.consumer_key = "92467-65f5fc8b43d8b9b30565b837";
    this.request.consumer_key = this.consumer_key;
    this.request.redirect_uri = this.redirect_uri;
    this.authorize.consumer_key = this.consumer_key;
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
    body.children[4].appendChild(img);
    var footer = document.getElementById(footerId);
    footer.children[0].innerHTML = this.companies[this.index].companyAddress;
  }

  closeModal() {
    document.getElementById(this.id).style.display = "none";
  }

  addToPocket() {
    this.api.postRequest(this.request).subscribe(data => {
      this.resp = data.split('=', 2);
      this.code = this.resp[1];
      this.authorize.code = this.code;
      window.location.href = ("https://getpocket.com/auth/authorize?request_token=" + this.consumer_key + "&redirect_uri=" + this.redirect_uri);


      this.api.postAuthorize(this.authorize).subscribe(data => {
        this.resp = data;
        this.resp.split('=',2);
      })
    })
  }
}