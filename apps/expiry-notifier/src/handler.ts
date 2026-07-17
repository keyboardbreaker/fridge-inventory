import sendEmail from "./awsSesEmail";
import getExpiringFood, { ExpiringFood } from "./getExpiringFood";
import notificationAlreadySent from "./notificationAlreadySent";
import saveNotification from "./saveNotification";
import shouldNotify from "./shouldNotify";
import expiryTemplate from "./templates";

const main = async () => {
    const items: ExpiringFood[] = await getExpiringFood();

    for (const item of items) {
        if (!item.owner ||
            !item.owner.email_notifications ||
            !item.best_before_date
        ) {
            continue;
        }

        if (!shouldNotify(
                item.best_before_date,
                item.owner.notify_days_before
            )
        ) {
            continue;
        }

        const alreadySent = await notificationAlreadySent(
            item.id,
            "expiry_warning"
        );

        if(alreadySent) {
            continue;
        }

        const email = expiryTemplate(
            item.fridge!.name,
            item.name,
            item.owner.notify_days_before
        );

        await sendEmail(
            item.owner.email,
            email.subject,
            email.body

        );
        await saveNotification(
            item.id,
            item.owner.id,
            item.owner.email,
            "expiry_warning"
        );
    }
};

main();