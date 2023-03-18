export const DbDateConvert = (dbDate) => {
    var date = new Date(dbDate);

    const hours = date.getHours();
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : ("0" + date.getMinutes())
    const time = hours + ":" + minutes;

    const dateF = date.getDate() + "." + date.getMonth() + "." + date.getFullYear();

    return {time: time, date: dateF}
 };