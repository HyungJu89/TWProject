

// 팔로워수 한글변환
export const formatUnit = (number) => {
    let unit = ['만', '천']
    let num = [100000 , 10000 , 1000]

    if (number/num[0] >= 1){
        let int = Math.floor(number / num[1])

        return int + unit[0]
    }


    if (number/num[1] >= 1) {
        let int = Math.floor(number / num[2]);

        if(int % 10 == 0){
            return Math.floor(int / 10) + unit[0]
        }


        return Math.floor(int / 10) + unit[0] + Math.floor(int % 10) + unit[1]
    
    }
    if (number/num[2]  >= 1) {
        return Math.floor(number / num[2]) + unit[1];
    }
    return number
}