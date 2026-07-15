/*
    should I send a notification today 
    if an item has expired on a given date.
*/
const shouldNotify = (expiry: string, notifyDaysBefore: number) => {
    const today = new Date();
    const expiryDate = new Date(expiry);

    const days = Math.ceil( //round up
        (expiryDate.getTime() -  today.getTime()) //time till expiry in milliseconds
            /(1000 * 60 * 60 * 24) //days from milliseconds
    );

    return days === notifyDaysBefore || notifyDaysBefore >= days;
}

export default shouldNotify;