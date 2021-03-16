//调整时间格式
export function handleTime(data){
    // console.log(data)
    let t = data.split('T');
    let date = t[0].substring(5);
    let time = t[1].substring(0,5);
    // console.log(time);
    return date+' '+time;
}