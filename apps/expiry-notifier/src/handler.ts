import getExpiringFood from "./notifications";

const main = async () => {
    const items = await getExpiringFood();

    console.log(items);
};

main();