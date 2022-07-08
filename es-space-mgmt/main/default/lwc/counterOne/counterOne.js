import { LightningElement ,wire } from 'lwc';
import getCountReservation from '@salesforce/apex/getCount.getCountReservation'
import { NavigationMixin } from 'lightning/navigation';
export default class CounterOne extends  NavigationMixin(LightningElement)  {
    TotalCount ;
    reservationsWithSpace ;
    @wire(getCountReservation, {space : true}) reservationsWithoutSpace ;
    @wire(getCountReservation, {space : false}) reservations({data , error}) {
        if(data) {
            this.TotalCount = data ;
            this.reservationsWithSpace = this.TotalCount - this.reservationsWithoutSpace.data ;
        }
    }
     navigateToContactHome() {
        this[NavigationMixin.Navigate]({
            "type": "standard__objectPage",
            "attributes": {
                "objectApiName": "Reservation__c",
                "actionName": "list"
            }
        });
    } 
}