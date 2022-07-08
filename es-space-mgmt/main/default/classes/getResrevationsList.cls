public  with sharing class getResrevationsList {
    @AuraEnabled(cacheable=true)
    public static  List<Reservation__c>  getReservations() {
        return [SELECT Id ,Contact__c,Lead__c,Market__c,Space__c FROM Reservation__c] ;
    }
    public static List<Contact> getContactName(String id) {
        return [SELECT Name FROM Contact WHERE Id =: id] ;
    }
}