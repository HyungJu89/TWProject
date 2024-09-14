export const dateTime = (date) => {
    
    const dateTime = new Date(date);
    const currentDate = new Date();

    const difference = currentDate.getTime() -  dateTime.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    if(days >= 1){
        return `${days}일 전`
    }

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if(hours >= 1){
        return `${hours}시간 전`
    }

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    if(minutes >= 1){
        return `${minutes}분 전`
    }

    const seconds =  Math.floor((difference % (1000 * 60)) / (1000));
    return `${seconds}초 전`

}