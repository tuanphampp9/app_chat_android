const handleTimeMessage = (time) => {
    const date = new Date(time);
    const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
    //check xem có phải ngày hiện tại không
    const isCurrentDay = new Date().getDate() - date.getDate();
    if (isCurrentDay === 0) {
        //là ngày hiện tại
        return `${hours}:${minutes}`
    } else {
        //là những ngày trước đó
        return `${date.getDate()} tháng ${date.getMonth() + 1}`;
    }
}

export { handleTimeMessage };