import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-user-screen',
  templateUrl: './user-screen.component.html',
  styleUrls: ['./user-screen.component.scss']
})
export class UserScreenComponent implements OnInit {

  allUsers:any;
  userChatForm: FormGroup;
  selectedUserIndex:any;
  selectedUser:any
  selectedUserChats:any;



  constructor
  (
    private _myService:MyServiceService,
    private fb: FormBuilder,
  ) {
    this.userChatForm = this.fb.group({
      chat:['',Validators.required]
    });
  }

  ngOnInit(): void {
      this.getAllUsers()
  }
  getAllUsers() {
    this._myService.getUsers().subscribe((res:any)=>{
      this.allUsers = res.allUsers
    })
  }

  sendChat(selectedUser: any) {
      const chat = this.userChatForm.get('chat')?.value;
      console.log('Chat message:', chat);

      const data = {
        receiverEmail:selectedUser.email,
        chat:chat
      }

      this._myService.sendChat(data).subscribe((res)=>{
        console.log(res)
      })

  }
  

  userActivated(user:any,index:number) {
    this.selectedUserIndex = index
    this.selectedUser = user;
    console.log(user,'user')
    this.getSelectedUserChats()
  }

  getSelectedUserChats() {
    const data ={
      selectedUserEmail:this.selectedUser.email
    }
    if(data) {
      this._myService.getChats(data).subscribe((res)=>{
        console.log(res)
      })
    }
  }

}
