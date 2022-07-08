public class getPriorityReservations {
     @auraEnabled(cacheable=true)
    public static List<Reservation__c> getpReservations() {
        return [ SELECT Id ,Contact__c,Lead__c,Start_Date__c
         FROM Reservation__c ORDER BY Remaining_days__c ASC LIMIT 10];
    }
}