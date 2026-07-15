import getExpiringFood, { ExpiringFood } from "./getExpiringFood";
import shouldNotify from "./shouldNotify";

const main = async () => {
    const items: ExpiringFood[] = await getExpiringFood();

    // console.log(items);

    for (const item of items) {
        if (!item.owner!.email_notifications)
            continue;

        if (!item.best_before_date)
            continue;

        if (
            shouldNotify(
                item.best_before_date,
                item.owner!.notify_days_before
            )
        ) {
            console.log(
                `${item.name} expiring on 
                ${item.best_before_date}, 
                should send email`
            );
        }
}
};

main();