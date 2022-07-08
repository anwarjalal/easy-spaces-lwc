import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getOpenReservations from '@salesforce/apex/getPriorityReservations.getpReservations';
export default class ReservationsTable extends LightningElement {
    wiredResult;
    reservationSelected = false;
    selectedRecId;
    _records = [];
    reservations = [];
    errorMsg;
    msgForUser;
    noRecords = false;

    @wire(getOpenReservations)
    wiredReservations(value) {
        this.wiredResult = value;
        if (value.error) {
            this.errorMsg = value.error;
            this.msgForUser = 'There was an issue loading reservations.';
        } else if (value.data) {
            if (value.data.length) {
                this._records = [...value.data];
                this.handleMute();
                if (this.noRecords) this.noRecords = false;
            } else {
                this.noRecords = true;
            }
        }
    }

    handleMute() {
        if (!this.reservationSelected) {
            let muted = '';
            this.reservations = this._records.map((record) => {
                if (this.selectedRecId) {
                    this.reservationSelected = true;
                    muted = record.Id === this.selectedRecId ? false : true;
                } else {
                    muted = false;
                }
                return { record, muted };
            });
        }
    }
}