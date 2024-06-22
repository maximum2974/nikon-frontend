export const getTime = () => {
    let message = "";
    let hours = new Date().getHours();
    if (hours <= 12) {
        message = "good morning";
    } else if (hours <= 18) {
        message = "good afternoon";
    } else {
        message = "good evening";
    }
    return message;
}