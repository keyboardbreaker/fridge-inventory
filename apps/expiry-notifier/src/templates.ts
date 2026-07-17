const expiryTemplate = (
    fridge: string,
    item: string,
    days: number
) => 
({
    subject: `${item} expires soon`,
    body: `${item}

        Fridge: ${fridge}

        This item expires in ${days} day${days === 1 ? "" : "s"}.

        Please check your fridge inventory.
    `
});

export default expiryTemplate;
