import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class ReservationTil extends NavigationMixin(LightningElement) {
    @api reservation;
    navRef;
    openModal = false ;
    openModalForm = false ;

    get cssClass() {
        return this.reservation.muted ? 'mute pointer' : 'pointer';
    }

    connectedCallback() {
        this.reservationRecordRef = {
            type: 'standard__recordPage',
            attributes: {
                recordId: this.reservation.record.Id,
                actionName: 'view'
            }
        };
        this[NavigationMixin.GenerateUrl](this.reservationRecordRef).then(
            (url) => (this.navRef = url)
        );
    }

    handleTileClick() {
        const clickevt = new CustomEvent('reservationselect', {
            detail: {
                reservationId: this.reservation.record.Id,
                marketId: this.reservation.record.Market__c,
                customerName: this.reservation.record.Contact__c
                    ? this.reservation.record.Contact__r.Name
                    : this.reservation.record.Lead__r.Name
            }
        });
        this.dispatchEvent(clickevt);
    }
openModalHandler() {
  this.openModal = true ;
}
openModalFormHandler() {
  this.openModalForm = true ;
}
cancelModal() {
  this.openModal = false ;
}
cancelModalForm() {
  this.openModalForm = false ;
}

}