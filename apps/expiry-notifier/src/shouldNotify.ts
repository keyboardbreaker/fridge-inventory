const shouldNotify = (expiry: string, notifyDaysBefore: number) => {
    const today = new Date();
    const expiryDate = new Date(expiry);

    const days = Math.ceil(
        (expiryDate.getTime() -  today.getTime())
            /(1000 * 60 * 60 * 24)
    );

    return days === notifyDaysBefore || notifyDaysBefore >= days;
}

export default shouldNotify;