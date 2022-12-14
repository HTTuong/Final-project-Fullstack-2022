export function getFormatedDate() {
    const currentDate = new Date();
    const day = currentDate.getDay().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    const hour = currentDate.getHours().toString().padStart(2, '0');
    const minute = currentDate.getMinutes().toString().padStart(2, '0');
    const second = currentDate.getSeconds().toString().padStart(2, '0');
    const time = [hour, minute, second].join('.')
    const date = [year, month, day].join('-')
    const result = [date, 'at', time].join('-')
    return result
}