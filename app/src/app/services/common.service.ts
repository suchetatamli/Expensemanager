import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../globalConfig';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) { }

  /* user search */
  searchUser(searchtext) {
		return this.http.get(global.API_URL +'/search-user/'+searchtext);
  }
  /* create group */
  creategroup(postData){
    return this.http.post(global.API_URL + '/create-group', postData);
  }
  /* group list */
  groupList(userId){
    return this.http.get(global.API_URL + '/group-list/' + userId);
  }
  /* group detail */
  groupDetails(id) {
    return this.http.get(global.API_URL + '/group-details/' + id);
  }
  /* group delete */
  deleteGroup(id) {
    return this.http.get(global.API_URL + '/group-delete/' + id);
  }
  /* delete member from group */
  deleteGroupUser(groupId, userId) {
    return this.http.get(global.API_URL + '/group-member-delete/' + groupId + '/' + userId);
  }
  /* Add member at group */
  addGroupMember(postData){
    return this.http.post(global.API_URL + '/add-member', postData);
  }
  /* deposit amount */
  saveDeposit(postData){
    return this.http.post(global.API_URL + '/deposit-amount', postData)
  }
  /* save pay */
  savePay(postData){
    return this.http.post(global.API_URL + '/save-payment', postData);
  }
  /* expense history */
  expenseHistory(groupId){
    return this.http.get(global.API_URL + '/expense-history/' + groupId);
  }
  /* delete group expense */
  deleteGroupExpense(paymentId){
    return this.http.get(global.API_URL + '/delete-group-expense/' + paymentId);
  }
  /* edit payment */
  editGroupExpense(paymentId){
    return this.http.get(global.API_URL + '/edit-group-expense/' + paymentId);
  }
  /* update expense */
  updateGroupExpense(postData){
    return this.http.post(global.API_URL + '/update-payment/' + postData.paymentId, postData)
  }
}
